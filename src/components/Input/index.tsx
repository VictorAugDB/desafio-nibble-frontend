import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container, InputName, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  containerStyle?: React.CSSProperties;
  type?: string;
  icon?: React.ComponentType<IconBaseProps>;
  isCepFinded?: boolean;
  placeholder: string;
  setIsCepFinded?: (state: boolean) => void;
}

const Input: React.FC<InputProps> = ({
  name,
  type,
  containerStyle = {},
  icon: Icon,
  isCepFinded,
  setIsCepFinded,
  placeholder,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);


  useEffect(() => {
    if (isCepFinded === true) {
      setIsFilled(true)
      setIsCepFinded(false)
    }
  }, [isCepFinded])

  return (
    <Container
      style={containerStyle}
      isErrored={!!error}
      isFocused={isFocused}
      isFilled={isFilled}
      className='__Input'
    >
      { isFocused || isFilled ? (
        <InputName>
          {placeholder}
        </InputName>
      ) : (
        <></>
      )}
      {Icon && <Icon size={20} />}
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        type={type}
        ref={inputRef}
        placeholder={!isFilled && !isFocused ? placeholder : ''}
        {...rest}
      />
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Input;
