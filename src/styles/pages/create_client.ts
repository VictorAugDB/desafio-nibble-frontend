import { shade } from 'polished';
import styled from 'styled-components';

interface IAddressesContentProps {
  hasVisible: boolean;
}
interface IHiddenAddressesProps {
  hasVisible: boolean;
}

export const Container = styled.div`
  width: 100%;
  padding: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  background: #fff;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 0 0.1rem var(--gray-200);

  form {
    .__Input {
      width: 20rem;
      height: 52px;
      margin-top: 1rem;
    }

    > button {
      display: block;
      margin: 1rem auto 0 auto;
      width: 10rem;
      height: 2.75rem;
      border: 0;
      border-radius: 1.5rem;
      background: var(--cyan-green);

      color: var(--white);
      font-weight: 500;
      font-size: 1.1rem;

      &:hover {
        background: ${shade(0.1, '#22C9AE')}
      }
    }
  }
`;

export const AddressContainer = styled.div`
  > button {
    display: flex;
    align-items: center;
    margin-top: 2rem;
    background: transparent;
    border: 0;
    margin-left: auto;

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
`

export const AddressesContent = styled.div<IAddressesContentProps>`
  margin-top: 1rem;
  display: ${props => props.hasVisible ? 'flex' : 'none'};
  align-items: center;

  flex-wrap: wrap;

  .__Input:not(:last-of-type) {
    margin-right: 1rem;
  }

  > span {
    display: flex;
    align-items: center;
    flex-basis: 100%;
    width: 0;
    margin-top: 1rem;

    p {
      margin-left: 0.5rem;
      font-weight: 500;
    }

    > button {
      display: flex;
      align-items: center;
      background: transparent;
      border: 0;
      margin-left: auto;

      color: var(--gray-500);

      p {
        font-size: 1.2rem;
        font-weight: 400;
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

export const HiddenAddress = styled.div<IHiddenAddressesProps>`
  display: ${props => props.hasVisible ? 'flex' : 'none'};
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

