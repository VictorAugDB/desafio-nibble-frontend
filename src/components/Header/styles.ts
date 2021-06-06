import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 6.5rem;
  background: #fff;
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  svg {
    width: 1.5rem;
    height: 1.5rem;
    position: absolute;
    right: 70px;
    color: var(--purple-500);

    &:hover {
      cursor: pointer;
      filter: brightness(0.8);
    }
  }
`;