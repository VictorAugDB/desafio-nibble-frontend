import { FormHandles } from '@unform/core';
import { useRouter } from 'next/router'
import { useCallback, useRef, useState } from 'react'
import Input from '../components/Input'
import { Form } from '@unform/web'
import * as Yup from 'yup';
import { FiLock, FiMail } from 'react-icons/fi';
import { useAuth } from '../hooks/auth';
import getValidationErrors from '../utils/getValidationErrors';

import { Container, Content, ButtonContainer } from '../styles/pages/index'
import { GetServerSideProps } from 'next';
interface SignInFormData {
  email: string;
  password: string;
}

export default function SignIn() {
  const formRef = useRef<FormHandles>(null);
  const { signIn } = useAuth();
  const { push } = useRouter()

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('E-mail obrigatório'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });

        push('/dashboard')

      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        console.log(err)
      }
    },
    [signIn],
  );


  return (
    <Container>
      <Content>
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input name="password" icon={FiLock} placeholder="Senha" />

          <ButtonContainer>
            <button type='submit'>Entrar</button>
          </ButtonContainer>
        </Form>
      </Content>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { dribbleChallengeUser, dribbleChallengeToken } = ctx.req.cookies

  if (dribbleChallengeToken && dribbleChallengeUser) {
    return {
      redirect: {
        permanent: false,
        destination: '/dashboard'
      }
    }
  }

  return {
    props: {
    }
  }
}
