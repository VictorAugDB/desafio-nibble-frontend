import { FormHandles } from '@unform/core';
import { useCallback, useRef } from 'react';
import * as Yup from 'yup';

import Modal from '../Modal'
import { Content } from './styles'
import getValidationErrors from '../../utils/getValidationErrors';
import { Form } from '@unform/web';
import Input from '../Input';
import { verifyCpf } from '../../utils/verifyCpf';
import InputWithMask from "../InputWithMask";

interface Address {
  id: number;
  cep: string;
  state: string;
  city: string;
  district: string;
  road: string;
  number: string;
  complement: string;
  type: string;
  is_primary_address: boolean;
  isActive: boolean;
}

interface Client {
  id: string
  name: string;
  cpf: string;
  telephone: string;
  email: string;
  created_at: string;
  updated_at: string;
  addresses: Address[];
}

interface ModalConfirmationProps {
  isOpen: boolean;
  setIsOpen: () => void;
  title: string;
  subtitle: string;
  handleAlterClient: (client: Omit<Client, 'created_at' | 'updated_at' | 'addresses'>) => void
  clientToAlter: Client
}

export function ModalAlterClient({ isOpen, setIsOpen, title, subtitle, handleAlterClient, clientToAlter }: ModalConfirmationProps) {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('E-mail obrigatório'),
          cpf: Yup.string().required('CPF obrigatório').test(`verify-cpf-is-valid`, 'CPF inválido', function (value) {        
            return verifyCpf(value.replace(/\./g, '').replace('-', ''))
          }),
          telephone: Yup.string().required('Telefone obrigatório'),
          name: Yup.string().required('Nome obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const client = {
          ...data,
          id: clientToAlter.id
        }

        handleAlterClient(client)

        setIsOpen()

        alert('cliente alterado com sucesso!')

      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        console.log(err)
      }
    },
    [clientToAlter],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Content>
        <h2>{title}</h2>
        <h3>{subtitle}</h3>
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          initialData={{
            name: clientToAlter?.name,
            cpf: clientToAlter?.cpf,
            telephone: clientToAlter?.telephone,
            email: clientToAlter?.email,        
          }}
        >
          <Input name="name" placeholder="Nome" />
          <InputWithMask mask="999.999.999-99" name="cpf" placeholder="CPF" />
          <InputWithMask mask="(99) 99999-9999" name="telephone" placeholder="Telefone" />
          <Input name="email" placeholder="E-mail" />

          <div>
            <button type="button" onClick={setIsOpen} >Cancelar</button>
            <button type="submit" onClick={handleSubmit} >Alterar</button>
          </div>
        </Form>
      </Content>
    </Modal>
  )
}