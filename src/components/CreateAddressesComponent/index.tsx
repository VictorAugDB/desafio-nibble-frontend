import { Fragment, useRef } from 'react';
import { Container } from './styles';

interface DataProps {
  name: string;
  idade: number;
}

interface ICreateAddressesComponent {
  data: DataProps[];
}

export function CreateAddressesComponent({ data }: ICreateAddressesComponent) {
  const itemEls = useRef(new Array())

  function handleSubmit(e) {
    e.preventDefault()

    console.log(itemEls.current.map(el => el.value && el.value))
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        {data.map(item => (
          <Fragment key={item.name}>
            <p>{item.name}</p>
            <input placeholder="Escreva algo" ref={element => itemEls.current.push(element)} />
          </Fragment>
        ))}
        <button type="submit">Submeter</button>
      </form>
    </Container>
  )
}