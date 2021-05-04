import { useState } from 'react'
import { FiCheck } from 'react-icons/fi'
import { Check } from './styles'

interface CheckBoxProps {
  isChecked: boolean;
  onClick: () => void;
}

export function CheckBox({ isChecked, onClick }: CheckBoxProps) {

  return (
    <Check className="__Checkbox" isChecked={isChecked} onClick={onClick}>
      {isChecked && <FiCheck />}
    </Check>
  )
}