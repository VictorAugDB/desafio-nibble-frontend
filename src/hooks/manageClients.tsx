import React, { createContext, useCallback, useContext, useState } from "react";
import api from "../services/api";

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
  addresses: Address[]
}

interface ManageClientsContextData {
  addresses: Address[];
  setAddresses: (addresses: Address[]) => void;
  clients: Client[];
  confirmDeleteAddress: boolean;
  setConfirmDeleteAddress: (state: boolean) => void;
  setClients: (clients: Client[]) => void;
  handleAddAddress: () => void;
  handleExpandAddress: (addressId: number) => void;
  handleSetPrimaryAddress: (addressId: number) => void;
  handleRemoveAddress: (address_id: number) => void;
}

const ManageClientsContext = createContext<ManageClientsContextData>({} as ManageClientsContextData);

const ManageClientsProvider: React.FC = ({ children }) => {
  const [addresses, setAddresses] = useState<Address[]>()
  const [clients, setClients] = useState<Client[]>()
  const [confirmDeleteAddress, setConfirmDeleteAddress] = useState(false)


  const resetedAddress = {
    id: Math.random() * 10,
    cep: '',
    state: '',
    city: '',
    district: '',
    road: '',
    number: '',
    complement: '',
    type: '',
    is_primary_address: true,
    isActive: true
  }

  const handleAddAddress = useCallback(() => {
    const newAddress = {
      ...resetedAddress,
      id: Math.random() * 10,
      is_primary_address: false,
    }

    const updatedAddresses = addresses.map(address => address.isActive ? { ...address, isActive: false } : address)

    setAddresses([...updatedAddresses, newAddress])
  }, [addresses])

  const handleExpandAddress = useCallback((addressId: number) => {

    const updatedAddresses = addresses.map(address => address.id !== addressId ? { ...address, isActive: false } : { ...address, isActive: true })

    setAddresses(updatedAddresses)
    setConfirmDeleteAddress(false)
  }, [addresses])

  const handleSetPrimaryAddress = useCallback((addressId: number) => {
    const updatedAddresses = addresses.map(check => check.id === addressId ? { ...check, is_primary_address: !check.is_primary_address } : { ...check, is_primary_address: false })

    setAddresses(updatedAddresses)
  }, [addresses])


  async function handleRemoveAddress(address_id) {
    try {
      const { data } = await api.get('/address/specific', {
        params: {
          id: address_id
        }
      })

      if (!data) {
        const address = addresses.find(address => address.id === address_id)

        if (address.is_primary_address) {
          alert('Não é possível remover o endereço principal!');
          return;
        }

        const addressesFiltered = addresses.filter(address => address.id !== address_id)

        setAddresses(addressesFiltered.map(address => address.is_primary_address ? { ...address, isActive: true } : address))
        setConfirmDeleteAddress(false)

        return;
      }

      const filteredAddresses = addresses.filter(address => address.id !== address_id)
      const address = addresses.find(address => address.id === address_id)
      const client = clients.find(client => {
        const checkClient = client.addresses.find(address => address.id === address_id)

        if (checkClient) {
          return true
        } else {
          return false
        }
      })
      client.addresses = client.addresses.filter(address => address.id !== address_id)

      if (address.is_primary_address) {
        alert('Você não pode remover o endereço principal!')
        return;
      }

      await api.delete('/address', {
        params: {
          id: address_id
        }
      })

      setClients(clients.map(cli => cli.id === client.id ? client : cli))
      setAddresses(filteredAddresses.map(address => address.is_primary_address ? { ...address, isActive: true } : address))
      setConfirmDeleteAddress(false)

      alert('Endereço removido com sucesso')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <ManageClientsContext.Provider
      value={{
        addresses,
        setAddresses,
        clients,
        setClients,
        confirmDeleteAddress,
        setConfirmDeleteAddress,
        handleAddAddress,
        handleExpandAddress,
        handleSetPrimaryAddress,
        handleRemoveAddress
      }}
    >
      {children}
    </ManageClientsContext.Provider>
  )
}

function useManageClients(): ManageClientsContextData {
  const context = useContext(ManageClientsContext);

  return context;
}

export { ManageClientsProvider, useManageClients }