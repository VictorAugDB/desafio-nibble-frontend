import { useRouter } from 'next/router'
import api from '../../services/api'
import Modal from '../Modal'
import { Content } from './styles'

interface ModalConfirmationProps {
  isOpen: boolean;
  setIsOpen: () => void;
  title: string;
  subtitle: string;
  goToPath: string;
}

export function ModalConfirmPath({ isOpen, setIsOpen, title, subtitle, goToPath }: ModalConfirmationProps) {
  const { push } = useRouter()

  function handleGoToPath() {
    setIsOpen()
    push(goToPath)
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Content>
        <h2>{title}</h2>
        <h3>{subtitle}</h3>
        <div>
          <button onClick={setIsOpen}>Não</button>
          <button onClick={handleGoToPath} >Sim</button>
        </div>
      </Content>
    </Modal>
  )
}