import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  height: calc(100vh - 6.5rem);
  padding: 2rem 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;  

  .__SearchBar {
    margin-bottom: 2rem;
  }
`;

export const Content = styled.div`
  background: #fff;
  width: 100%;
  height: 100%;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 0 0.1rem var(--gray-200);

  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--tertiary);
    border-radius: 8px;
    border-right: 2px solid var(--primary)
  }

  ::-webkit-scrollbar-track {
    background-color: var(--secondary);
    border-right: 2px solid var(--primary)
  }

  table {
    width: 100%;

    th, td {
      border-bottom: 1px solid var(--gray-100);
    }

    thead {
      th {
        padding: 0 1rem;
        color: var(--gray-800);
        font-weight: 600;
      }
    }
    tbody {
      tr {
        td {
          padding: 0.25rem 1rem;
          text-align: center;
          color: var(--gray-500);
          font-weight: 500;

          &:nth-child(7) {
            svg {
              width: 1.35rem;
              height: 1.35rem;

              color: var(--cyan-green);

              &:hover {
                color: ${shade(0.2, '#22C9AE')};
                cursor: pointer;
              }
            }
          }

          &:nth-child(8) {
            svg {
              width: 1.25rem;
              height: 1.25rem;

              color: var(--purple-400);

              &:hover {
                color: ${shade(0.2, '#9164fa')};
                cursor: pointer;
              }
            }
          }

          &:nth-child(9) {
            svg {
              width: 1.25rem;
              height: 1.25rem;

              color: var(--red-200);

              &:hover {
                color: ${shade(0.2, '#FC6565')};
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }

  > button {
    display: block;
    margin: 1rem auto 0 auto;
    padding: 0.5rem;
    border-radius: 2rem;
    border: 0;
    background: var(--purple-400);
    transition: background 0.2s;

    p {
      font-weight: 500;
      color: var(--white);
    }

    &:hover {
      background: ${shade(0.1, '#9164fa')}
    }
  }
`