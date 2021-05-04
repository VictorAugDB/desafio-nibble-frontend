import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { HeaderOption } from '../HeaderOption'
import { ModalConfirmPath } from '../ModalConfirmPath'
import { Container, Content } from './styles'

export function Header() {
  const [activeRoute, setActiveRoute] = useState('')
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)
  const [path, setPath] = useState('')

  const { pathname, push } = useRouter()

  useEffect(() => {
    setActiveRoute(pathname.replace('/', ''))
  }, [pathname])

  function toggleModal() {
    setConfirmModalOpen(!confirmModalOpen)
  }

  function togglePath(path: string) {
    setPath(path)
    setConfirmModalOpen(!confirmModalOpen)
  }

  return (
    <Container>
      <ModalConfirmPath
        isOpen={confirmModalOpen}
        setIsOpen={toggleModal}
        title="Deseja realmente sair da página ?"
        subtitle="Os dados do formulário serão perdidos!"
        goToPath={path}
      />
      <Content>
        <HeaderOption
          isActive={activeRoute === 'dashboard'}
          onClick={() => pathname === '/create_client' ? togglePath('/dashboard') : push('/dashboard')}>
            Home
          </HeaderOption>
        <HeaderOption
          isActive={activeRoute === 'create_client'}
          onClick={() => push('/create_client')}>Criar cliente</HeaderOption>
        <HeaderOption
          isActive={activeRoute === 'manage_clients'}
          onClick={() => pathname === '/create_client' ? togglePath('/manage_clients') : push('/manage_clients')}>Gerenciar clientes</HeaderOption>
      </Content>
    </Container>
  )
}