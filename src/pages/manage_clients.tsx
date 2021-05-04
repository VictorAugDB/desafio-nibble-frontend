import { GetServerSideProps } from 'next'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FiArrowRight, FiEdit, FiSearch } from 'react-icons/fi'
import { MdDeleteForever } from 'react-icons/md'
import api from '../services/api'
import { Container, Content } from '../styles/pages/manage_clients'
import { ModalConfirmDelete } from '../components/ModalConfirmDelete'
import { ModalAlterClient } from '../components/ModalAlterClient'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale';
import { ModalAlterClientAddresses } from '../components/ModalAlterClientAddresses'
import { useManageClients } from '../hooks/manageClients'
import { SearchBar } from '../components/SearchBar'

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

interface ManageClientsProps {
  clientsData: Client[];
  count: number;
}

export default function ManageClients({ clientsData, count }: ManageClientsProps) {
  const { clients, setClients } = useManageClients();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [alterClientModalOpen, setAlterClientModalOpen] = useState(false);
  const [alterClientAddressesModalOpen, setAlterClientAddressesModalOpen] = useState(false);
  const [clientToAlter, setClientToAlter] = useState<Client>();
  const [haveMoreClients, setHaveMoreClients] = useState(false);
  const [clientIdToDelete, setClientIdToDelete] = useState('');
  const [actualPage, setActualPage] = useState(1);
  const [clientsCount, setClientsCount] = useState(count);
  const [searchValue, setSearchValue] = useState(searchInputRef.current?.value)
  const [clientsSearch, setClientsSearch] = useState<Client[]>([])

  useEffect(() => {
    setClients(clientsData)
  }, [])

  useEffect(() => {
    if (clients && clients.length < clientsCount) {
      setHaveMoreClients(true)
    } else {
      setHaveMoreClients(false)
    }
  }, [clients])

  useEffect(() => {
    if (searchValue === '') {
      setClientsSearch([])
      return;
    }
  }, [searchValue])

  function toggleConfirmModal() {
    setConfirmModalOpen(!confirmModalOpen)
  }

  function toggleAlterModal() {
    setAlterClientModalOpen(!alterClientModalOpen)
  }

  function toggleAlterAddressesModal() {
    setAlterClientAddressesModalOpen(!alterClientAddressesModalOpen)
  }

  function toggleClientToAlter(client: Client) {
    setClientToAlter(client);

    toggleAlterModal()
  }

  function toggleClientToAlterAddresses(client: Client) {
    setClientToAlter(client);

    toggleAlterAddressesModal()
  }

  function toggleClientIdToDelete(client_id: string) {
    setClientIdToDelete(client_id)
    toggleConfirmModal();
  }

  async function loadMoreClients() {
    try {
      const { data } = await api.get('/client', {
        params: {
          page: actualPage + 1,
          take: 10
        }
      })

      console.log(data)

      const loadedClients = data.clients.map(client => (({
        ...client,
        created_at: format(
          new Date(client.created_at),
          'dd MMM yyyy',
          { locale: ptBR }
        ),
        updated_at: format(
          new Date(client.updated_at),
          'dd MMM yyyy',
          { locale: ptBR }
        ),
      })));

      console.log(loadedClients)

      setClients([...clients, ...loadedClients])
      setActualPage(actualPage + 1)
      setClientsCount(loadedClients.count)
    } catch (err) {
      console.log(err)
    }
  }

  async function handleAlterClient(
    client: Omit<Client, 'created_at' | 'updated_at | addresses'>
  ): Promise<void> {
    try {
      const alteredClientResponse = await api.put('/client', client)

      const alteredClient: Client = {
        ...alteredClientResponse.data,
        created_at: format(
          new Date(alteredClientResponse.data.created_at),
          'dd MMM yyyy',
          { locale: ptBR }
        ),
        updated_at: format(
          new Date(alteredClientResponse.data.updated_at),
          'dd MMM yyyy',
          { locale: ptBR }
        ),
      }

      setClients(
        clients.map(cli => client.id !== cli.id ? cli : alteredClient)
      )
    } catch (err) {
      console.log(err)
    }
  }

  async function handleCreateClientAddresses(addresses, client_id): Promise<void> {
    try {
      const client = clients.find(client => client.id === client_id)

      const createAddressData = {
        client_id: client.id,
        addresses: addresses
      }

      const response = await api.post('/address', createAddressData)

      const createdAddresses: Address[] = response.data

      const clientAndCreatedAddresses = {
        ...client,
        addresses: [...client.addresses, ...createdAddresses]
      }

      const newClientsData = clients.map(client => client.id === clientAndCreatedAddresses.id ? clientAndCreatedAddresses : client)

      setClients(newClientsData)

      alert('Endereços criados com sucesso')
    } catch (err) {
      throw new Error(err.message)
    }
  }

  async function handleAlterClientAddresses(client: Client): Promise<void> {
    try {
      const addresses = { addresses: client.addresses };

      const alteredClientAddressesResponse = await api.put('/address', addresses);

      const alteredClientAddresses: Address[] = alteredClientAddressesResponse.data;

      client.addresses = alteredClientAddresses;

      setClients(
        clients.map(cli => client.id !== cli.id ? cli : client)
      )
    } catch (err) {
      throw new Error(err.message)
    }
  }

  const handleSearch = useCallback(() => {
    const searchedClients = clients.filter(client => 
      client.name.includes(searchValue) ||
      client.cpf.includes(searchValue) ||
      client.telephone.includes(searchValue)
    )

    setClientsSearch(searchedClients)
  }, [searchValue, clientsSearch])

  return (
    <Container>
      {clients && (
        <>
          <SearchBar
            inputRef={searchInputRef}
            handleSearch={handleSearch}
            onChange={event => setSearchValue(event.target.value)}
          />
          <ModalAlterClientAddresses
            isOpen={alterClientAddressesModalOpen}
            setIsOpen={toggleAlterAddressesModal}
            title="Alterar Cliente"
            subtitle="Altere os campos e confirme as alterações!"
            clientToAlter={clientToAlter}
            handleAlterClientAddresses={handleAlterClientAddresses}
            handleCreateClientAddresses={handleCreateClientAddresses}
          />
          <ModalAlterClient
            isOpen={alterClientModalOpen}
            setIsOpen={toggleAlterModal}
            title="Alterar Cliente"
            subtitle="Altere os campos e confirme as alterações!"
            clientToAlter={clientToAlter}
            handleAlterClient={handleAlterClient}
          />
          <ModalConfirmDelete
            isOpen={confirmModalOpen}
            setIsOpen={toggleConfirmModal}
            title="Tem certeza que deseja deletar esse cliente ?"
            subtitle="Depois de deletar não será possível recuperar!"
            clientIdToDelete={clientIdToDelete}
            clients={clients}
            setClients={setClients}
          />

          <Content>
            <table cellSpacing={0}>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>CPF</th>
                  <th>Telefone</th>
                  <th>E-mail</th>
                  <th>Criado</th>
                  <th>Alterado</th>
                  <th>Endereços</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {clientsSearch.length > 0 ? (
                  <>
                    {clientsSearch.map(client => (
                      <tr key={client.id}>
                        <td>{client.name}</td>
                        <td>{client.cpf}</td>
                        <td>{client.telephone}</td>
                        <td>{client.email}</td>
                        <td>{client.created_at}</td>
                        <td>{client.updated_at}</td>
                        <td><FiArrowRight onClick={() => toggleClientToAlterAddresses(client)} /></td>
                        <td><FiEdit onClick={() => toggleClientToAlter(client)} /></td>
                        <td><MdDeleteForever onClick={() => toggleClientIdToDelete(client.id)} /></td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <>
                    {clients.map(client => (
                      <tr key={client.id}>
                        <td>{client.name}</td>
                        <td>{client.cpf}</td>
                        <td>{client.telephone}</td>
                        <td>{client.email}</td>
                        <td>{client.created_at}</td>
                        <td>{client.updated_at}</td>
                        <td><FiArrowRight onClick={() => toggleClientToAlterAddresses(client)} /></td>
                        <td><FiEdit onClick={() => toggleClientToAlter(client)} /></td>
                        <td><MdDeleteForever onClick={() => toggleClientIdToDelete(client.id)} /></td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>
            {haveMoreClients && (
              <button type="button" onClick={loadMoreClients}>
                <p>Carregar mais clientes</p>
              </button>
            )}
          </Content>
        </>
      )}
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

  const { data } = await api.get('/client', {
    headers: {
      Authorization: `Bearer ${dribbleChallengeToken}`
    },
    params: {
      page: 1,
      take: 10
    }
  });

  const clients = data.clients.map(client => (({
    ...client,
    created_at: format(
      new Date(client.created_at),
      'dd MMM yyyy',
      { locale: ptBR }
    ),
    updated_at: format(
      new Date(client.updated_at),
      'dd MMM yyyy',
      { locale: ptBR }
    ),
  })))

  return {
    props: {
      clientsData: clients,
      count: data.count
    }
  }
}