import { GetServerSideProps } from "next"
import { useRouter } from "next/router"

import { Container } from '../styles/pages/dashboard'

export default function Dashboard() {
  const { push } = useRouter()

  return (
    <Container >
      <section onClick={() => push('/create_client')}>
        <h1>Criar Clientes</h1>
        <h2>Aqui você pode criar clientes passando seus dados</h2>
      </section>
      <section onClick={() => push('/manage_clients')}>
        <h1>Gerenciar Clientes</h1>
        <h2>Aqui você pode alterar e excluir clientes</h2>
      </section>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { dribbleChallengeUser, dribbleChallengeToken } = ctx.req.cookies

  if (!dribbleChallengeToken && !dribbleChallengeUser) {
    return {
      redirect: {
        permanent: false,
        destination: '/'
      }
    }
  }

  return {
    props: {
    }
  }
}