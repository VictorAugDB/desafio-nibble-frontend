import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #fff;
  border-radius: 10px;
  padding: 0.75rem;
  width: 100%;

  border: 2px solid var(--blue-500);

  color: var(--gray-500);

  display: flex;
  align-items: center;

  ${props =>
    props.isFocused &&
    css`
      color: var(--purple-300);
      border-color: var(--purple-300);
    `}

  ${props =>
    props.isFilled &&
    css`
      color: var(--green-500);
      border-color: var(--green-500);
    `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: var(--gray-800);
    outline: none;

    &::placeholder {
      color: var(--gray-500);
    }
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
    transition: filter 0.2s;

    &:hover {
      cursor: pointer;
      filter: brightness(0.2);
    }
  }
`;
