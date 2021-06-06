import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #fff;
  border-radius: 10px;
  padding: 16px;
  width: 100%;
  position: relative;

  border: 2px solid var(--blue-500);

  color: var(--gray-500);

  display: flex;
  align-items: center;

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      color: var(--cyan-green);
      border-color: var(--cyan-green);
    `}

  ${props =>
    props.isFilled &&
    css`
      border-color: var(--cyan-green);
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
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;

export const InputName = styled.div`
  @keyframes nameAnimation{
    from {
      top: 16px;
      left: 16px;
    }
    to {
      top: 2.5px;
      left: 5px;
    }
  }

  color: var(--cyan-green);
  font-size: 0.75rem;

  position: absolute;
  top: 2.5px;
  left: 5px;
  animation: nameAnimation 0.3s;
`
