import styled, { css } from 'styled-components';

interface Option {
  isActive: boolean;
}

export const Option = styled.h2<Option>`
  opacity: 0.95;

  & + h2 {
    margin-left: 4rem;
  }

  &:hover {
    opacity: 0.7;
    cursor: pointer;

    text-shadow: 0.03rem 0.03rem 0.06rem var(--gray-800);
  }

  ${props => props.isActive && css`
    opacity: 0.7;

    text-shadow: 0.03rem 0.03rem 0.06rem var(--gray-800);
  `}
`;
