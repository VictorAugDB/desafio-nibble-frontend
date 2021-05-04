import { shade } from 'polished';
import styled from 'styled-components'
import backgroundImg from '../../static/background.jpg';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: url(${backgroundImg}) no-repeat center;
  background-size: cover;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  width: 25%;
  height: 18rem;
  border-radius: 1rem;
  background-color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 95%;

    div.__Input {
      width: 95%;
      & + .__Input {
        margin-top: 1rem;
      }
    }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 1.5rem;

  button {
    width: 10rem;
    height: 2.5rem;
    border-radius: 1.5rem;
    border: 0;
    text-transform: uppercase;
    font-weight: bold;

    background-color: var(--green-500);
    color: var(--gray-700);
    transition: background-color 0.2s;

    &:hover {
      background-color: ${shade(0.1, '#04d361')};
    }
  }
`
