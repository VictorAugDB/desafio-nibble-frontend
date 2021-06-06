import React from "react"
import { CreateAddressesComponent } from "../components/CreateAddressesComponent"

export default function Teste() {
  const add = [
  {
    name: 'victor',
    idade: 18
  },
  {
    name: 'maria',
    idade: 18
  }
]

  return (
    <CreateAddressesComponent data={add}/>
  )
}