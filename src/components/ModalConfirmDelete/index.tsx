import api from '../../services/api'
import Modal from '../Modal'
import { Content } from './styles'

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
  created_at: string,
  updated_at: string,
  addresses: Address[]
}

interface ModalConfirmationProps {
  isOpen: boolean;
  setIsOpen: () => void;
  title: string;
  subtitle: string;
  clientIdToDelete: string;
  clients: Client[];
  setClients: (clients: Client[]) => void;
}

export function ModalConfirmDelete({ isOpen, setIsOpen, title, subtitle, clientIdToDelete, clients, setClients }: ModalConfirmationProps) {
  async function handleDeleteClientById() {
    try {
      await api.delete('/client', {
        params: {
          id: clientIdToDelete
        }
      })

      setClients(
        clients.filter(client => client.id !== clientIdToDelete)
      )

      setIsOpen()

      alert('Cliente deletado com sucesso')
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Content>
        <h2>{title}</h2>
        <h3>{subtitle}</h3>
        <div>
          <button onClick={setIsOpen}>Não</button>
          <button onClick={handleDeleteClientById} >Sim</button>
        </div>
      </Content>
    </Modal>
  )
}