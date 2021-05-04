import { FormHandles } from '@unform/core';
import { useCallback, useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';

import Modal from '../Modal'
import getValidationErrors from '../../utils/getValidationErrors';
import { Form } from '@unform/web';
import Input from '../Input';
import { MdAdd, MdExpandMore, MdRemove } from 'react-icons/md';
import { CheckBox } from '../CheckBox';
import { Content, FormData, ButtonsContainer, HiddenAddress, ConfirmDeleteAddress } from './styles'
import { useManageClients } from '../../hooks/manageClients';
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
  handleAlterClientAddresses: (client: Client) => Promise<void>;
  handleCreateClientAddresses: (address, client_id: string) => Promise<void>;
  clientToAlter: Client;
}

export function ModalAlterClientAddresses({ isOpen, setIsOpen, title, subtitle, handleAlterClientAddresses, clientToAlter, handleCreateClientAddresses }: ModalConfirmationProps) {
  const formRef = useRef<FormHandles>(null);
  const {
    addresses,
    setAddresses,
    confirmDeleteAddress,
    setConfirmDeleteAddress,
    handleExpandAddress,
    handleAddAddress,
    handleSetPrimaryAddress,
    handleRemoveAddress
  } = useManageClients()

  useEffect(() => {
    if (clientToAlter) {
      const firstAddressId = clientToAlter.addresses[0].id
      const formattedAddresses = clientToAlter.addresses.map(address => firstAddressId === address.id ? { ...address, isActive: true } : { ...address, isActive: false })

      setAddresses(formattedAddresses)
    }
  }, [clientToAlter])

  function resetFormInfo(event: HTMLDivElement) {
    if (event === null) {
      setAddresses(clientToAlter.addresses)
    }
  }

  const handleSubmit = useCallback(
    async (data) => {
      try {
        formRef.current?.setErrors({});

        const formatData = ({ id, isActive, ...rest }: Address) => rest

        const formattedAddresses = {
          addresses: addresses.map(address => {
            const checkExists = clientToAlter.addresses.find(clientAddress => clientAddress.id === address.id)

            if (checkExists) {
              return address
            } else {
              return formatData(address)
            }
          })
        }

        const schema = Yup.object().shape({
          addresses: Yup.array().of(
            Yup.object().shape({
              cep: Yup.string().required('CEP obrigatório'),
              state: Yup.string().required('Estado obrigatório'),
              city: Yup.string().required('Cidade obrigatória'),
              district: Yup.string().required('Bairro obrigatório'),
              road: Yup.string().required('Rua obrigatória'),
              number: Yup.string().required('Número obrigatório'),
              complement: Yup.string().required('Complemento obrigatório'),
              type: Yup.string().required('Tipo obrigatório'),
            })
          )
        });

        await schema.validate(formattedAddresses, {
          abortEarly: false,
        });

        const addressesToAlter = addresses.filter(address => {
          const checkAddressesToAlter = clientToAlter.addresses.find(clientAddresses => address.id === clientAddresses.id);

          if (checkAddressesToAlter) {
            return address.id === checkAddressesToAlter.id
          } else {
            return;
          }
        })

        const addressesToCreate = addresses.filter(address => {
          const checkAddressesToCreate = clientToAlter.addresses.find(clientAddresses => address.id === clientAddresses.id);

          if (!checkAddressesToCreate) {
            return !!address
          } else {
            return;
          }
        })

        const client = {
          ...clientToAlter,
          addresses: addressesToAlter
        }

        if (addressesToCreate.length > 0) {
          await handleCreateClientAddresses(addressesToCreate, clientToAlter.id)
        }

        await handleAlterClientAddresses(client)

        setIsOpen()

        alert('Endereços alterados com sucesso!')

      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        console.log(err)
      }
    },
    [addresses],
  );

  return (
    <Modal
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          background: '#F0F0F5',
          color: '#000000',
          borderRadius: '8px',
          height: '80%',
          width: '80%',
          border: 'none',
        },
        overlay: {
          backgroundColor: '#121214e6',
        },
      }}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      overlayRef={event => resetFormInfo(event)}
    >
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
          {addresses?.map((address, index) => (
            <FormData key={address.id}>
              {address.isActive ? (
                <>
                  <InputWithMask
                    mask="99999-999"
                    name={`addresses[${index}].cep`}
                    placeholder="CEP"
                    value={address.cep}
                    onChange={e => {
                      address.cep = e.target.value
                      const updatedAddresses = [...addresses]
                      setAddresses(updatedAddresses)
                    }}
                  />
                  <Input
                    name={`addresses[${index}].state`}
                    placeholder="Estado"
                    value={address.state}
                    onChange={e => {
                      address.state = e.target.value
                      const updatedAddresses = [...addresses]
                      setAddresses(updatedAddresses)
                    }}
                  />
                  <Input
                    name={`addresses[${index}].city`}
                    placeholder="Cidade"
                    value={address.city}
                    onChange={e => {
                      address.city = e.target.value
                      const updatedAddresses = [...addresses]
                      setAddresses(updatedAddresses)
                    }}
                  />
                  <Input
                    name={`addresses[${index}].district`}
                    placeholder="Bairro"
                    value={address.district}
                    onChange={e => {
                      address.district = e.target.value
                      const updatedAddresses = [...addresses]
                      setAddresses(updatedAddresses)
                    }}
                  />
                  <Input
                    name={`addresses[${index}].road`}
                    placeholder="Rua(Logradouro)"
                    value={address.road}
                    onChange={e => {
                      address.road = e.target.value
                      const updatedAddresses = [...addresses]
                      setAddresses(updatedAddresses)
                    }}
                  />
                  <Input
                    name={`addresses[${index}].number`}
                    placeholder="Número"
                    value={address.number}
                    onChange={e => {
                      address.number = e.target.value
                      const updatedAddresses = [...addresses]
                      setAddresses(updatedAddresses)
                    }}
                  />
                  <Input
                    name={`addresses[${index}].complement`}
                    placeholder="Complemento"
                    value={address.complement}
                    onChange={e => {
                      address.complement = e.target.value
                      const updatedAddresses = [...addresses]
                      setAddresses(updatedAddresses)
                    }}
                  />
                  <Input
                    name={`addresses[${index}].type`}
                    placeholder="Tipo(comercial, residencial, rural ou casa de praia)"
                    value={address.type}
                    onChange={e => {
                      address.type = e.target.value
                      const updatedAddresses = [...addresses]
                      setAddresses(updatedAddresses)
                    }}
                  />
                  <span>
                    <div>
                      <CheckBox isChecked={address.is_primary_address} onClick={() => handleSetPrimaryAddress(address.id)} />
                      <p>Endereço Principal</p>
                    </div>
                    <button type="button" onClick={handleAddAddress}>
                      <p>Adicionar Endereço</p>
                      <MdAdd />
                    </button>
                    {!confirmDeleteAddress ? (
                      <button type="button" onClick={() => setConfirmDeleteAddress(true)}>
                        <p>Remover Endereço</p>
                        <MdRemove />
                      </button>
                    ) : (
                      <ConfirmDeleteAddress>
                        <p>Deseja mesmo remover ?</p>
                        <button type="button" onClick={() => handleRemoveAddress(address.id)}>Sim</button>
                        <button type="button" onClick={() => setConfirmDeleteAddress(false)}>Não</button>
                      </ConfirmDeleteAddress>
                    )}
                  </span>
                </>
              ) : (
                <HiddenAddress key={address.id}>
                  <p>Endereço {index + 1}</p>
                  <MdExpandMore onClick={() => handleExpandAddress(address.id)} />
                </HiddenAddress>
              )}
            </FormData>
          ))}
          <ButtonsContainer>
            <button type="button" onClick={setIsOpen} >Cancelar</button>
            <button type="submit">Alterar</button>
          </ButtonsContainer>
        </Form>
      </Content>
    </Modal>
  )
}