import { shade } from 'polished';
import styled from 'styled-components';

export const Content = styled.div`
  padding: 0 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h2 {
    color: var(--gray-800);
    text-align: center;
  }

  h3 {
    color: var(--gray-500);
    text-align: center;
  }
  
  > div {
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
  }
`;
