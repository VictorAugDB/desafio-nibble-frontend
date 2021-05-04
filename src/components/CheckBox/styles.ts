import styled, { css } from 'styled-components';

interface CheckProps {
  isChecked: boolean;
}

export const Check = styled.div<CheckProps>`
  width: 25px;
  height: 25px;
  background-color: #fff;
  border-radius: 0.5rem;
  border: 2px solid var(--blue-500);
  display: flex;
  align-items: center;
  justify-content: center;

  ${props => props.isChecked && css`
    background: var(--purple-300);

    svg {
      width: 24px;
      height: 24px;
      color: #fff;
    }
  `}
`;
