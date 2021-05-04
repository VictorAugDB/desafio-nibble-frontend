import { InputHTMLAttributes, MutableRefObject, useCallback, useRef, useState } from 'react';
import { FiSearch } from 'react-icons/fi'
import { Container } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  containerStyle?: React.CSSProperties;
  type?: string;
  inputRef: MutableRefObject<HTMLInputElement>
  handleSearch: (parameter: string) => void
}

export function SearchBar({
  type,
  containerStyle = {},
  inputRef,
  handleSearch,
  ...rest
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  return (
    <Container
      style={containerStyle}
      isFocused={isFocused}
      isFilled={isFilled}
      className='__SearchBar'
    >
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        type={type}
        ref={inputRef}
        {...rest}
      />
      <FiSearch onClick={() => handleSearch(inputRef.current?.value)}/>
    </Container>
  )
}