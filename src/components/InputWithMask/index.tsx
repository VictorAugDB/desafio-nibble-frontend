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
import InputMask, {Props} from 'react-input-mask'

import { Container, InputName, Error } from './styles';

interface InputProps extends Props {
  name: string;
  containerStyle?: React.CSSProperties;
  type?: string;
  mask: string;
  icon?: React.ComponentType<IconBaseProps>;
  placeholder: string;
}

const Input: React.FC<InputProps> = ({
  name,
  type,
  mask,
  containerStyle = {},
  icon: Icon,
  placeholder,
  ...rest
}) => {
  const inputRef = useRef(null);
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
      setValue(ref: any, value: string) {
        ref.setInputValue(value)
      }
    });
  }, [fieldName, registerField]);

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
      <InputMask
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        type={type}
        mask={mask}
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
