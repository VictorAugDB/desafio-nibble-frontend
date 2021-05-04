import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  height: calc(100vh - 6.5rem);
  display: flex;
  align-items: center;
  justify-content: center;

  section {
    width: 20rem;
    height: 25rem;
    background: var(--purple-500);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-radius: 1.5rem;
    transition: background 0.2s;

    &:hover {
      background: ${shade(0.1, '#8257e5')};
      cursor: pointer;
    }

    & + section {
      margin-left: 0.5rem;
    }

    h1, h2 {
      color: var(--white);
    }

    h1 {
      margin-bottom: 1rem;
    }

    h2 {
      text-align: center;
    }
  }
`;
