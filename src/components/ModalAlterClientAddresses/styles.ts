import { shade } from 'polished';
import styled from 'styled-components';

export const Content = styled.div`
  h2 {
      color: var(--gray-800);
      text-align: center;
    }

    h3 {
      color: var(--gray-500);
      text-align: center;
    }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .__Input {
      width: 20rem;
      height: 52px;
      margin: 1rem 1rem 0 0;
    }
  }
`;

export const FormData = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  > span {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-basis: 100%;
    width: 0;
    margin-top: 1rem;

    > div {
      display: flex;
      align-items: center;

      p {
        margin-left: 0.5rem;
        font-weight: 500;
      }
    }

    button {
      display: flex;
      align-items: center;
      background: transparent;
      border: 0;

      color: var(--gray-500);

      p {
        font-size: 1.2rem;
      }

      svg {
        width: 20px;
        height: 20px;
      }

      &:hover {
        text-decoration: underline;
      }
    }
  }
`

export const ButtonsContainer = styled.div`
      width: 100%;
      display: flex;
      justify-content: space-around;
      margin-top: 1rem;

      button {
        width: 108px;
        height: 48px;
        color: var(--gray-800);
        border: 0;
        border-radius: 1.5rem;
      }

      button:first-of-type {
        background: var(--red-400);
        transition: background 0.2s;

        &:hover {
          background: ${shade(0.1, '#FF3333')}
        }

        &:focus {
          border: 1px solid #000;
        }
      }

      button:last-of-type {
        background: var(--green-500);
        transition: background 0.2s;

        &:hover {
          background: ${shade(0.1, '#04d361')}
        }

        &:focus {
          border: 1px solid #000;
        }
      }
`

export const HiddenAddress = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;

  p {
    font-weight: 500;
  }
  
  svg {
    width: 24px;
    height: 24px;
    margin-left: 0.5rem;
    transition: color 0.5rem;

    &:hover {
      color: var(--blue-500);
      cursor: pointer;
    }
  }
`

export const ConfirmDeleteAddress = styled.div`
  @keyframes confirmAnimation {
    0% {
      width: 0;
      height: 1.6875rem;
    }
    100% {
      width: 17.75rem;
      height: 1.6875rem;
    }
  }

  @keyframes displayAnimation {
    0% {
      position: absolute;
      opacity: 0;
    }
    99% {
      position: absolute;
      opacity: 0;
    }
    100% {
      position: static;
      opacity: 1;
    }
  }

  animation: confirmAnimation 0.3s;

  background: rgba(0, 0, 0, 0.1);
  padding: 0.25rem 0.5rem;
  border-radius: 2rem;

  > p {
    animation: displayAnimation 0.3s;
  }

  > button {
    margin-left: 1rem;
    animation: displayAnimation 0.3s;

    &:hover {
      text-decoration: underline;
    }
  }
`
