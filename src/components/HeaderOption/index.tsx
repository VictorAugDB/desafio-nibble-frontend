import { ReactNode } from 'react'
import { Option } from './styles'

interface HeaderOptionProps {
  isActive: boolean;
  children: ReactNode;
  onClick: () => void;
}

export function HeaderOption({ isActive, children, onClick }: HeaderOptionProps) {
  return (
    <Option isActive={isActive} onClick={onClick}>
      {children}
    </Option>
  )
}