/* eslint-disable no-shadow */
import { useField } from '@unform/core';
import React, {
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { TextInputProps } from 'react-native';

import { Container, TextInput, Icon } from './styles';

interface InputRef extends TextInputProps {
  focus(): void;
}

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

interface InputValueReference {
  value: string;
}

const Input = forwardRef(
  ({ icon, name, ...rest }: InputProps, ref: ForwardedRef<InputRef>) => {
    const inputElementRef = useRef<any>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const {
      registerField,
      defaultValue = '',
      fieldName,
      error,
    } = useField(name);
    const inputValueRef = useRef<InputValueReference>({ value: defaultValue });
    const handleInputFocus = useCallback(() => {
      setIsFocused(true);
    }, []);
    const handleInputBlur = useCallback(() => {
      setIsFocused(false);
      setIsFilled(!!inputValueRef.current.value);
    }, []);

    useImperativeHandle(ref, () => ({
      focus() {
        inputElementRef.current.focus();
      },
    }));
    useEffect(() => {
      registerField<string>({
        name: fieldName,
        ref: inputValueRef.current,
        path: 'value',
        setValue(ref: any, value) {
          inputValueRef.current.value = value;
          inputElementRef.current.setNativeProps({ text: value });
        },
        clearValue() {
          inputValueRef.current.value = '';
          inputElementRef.current.clear();
        },
      });
    }, [fieldName, registerField]);
    return (
      <Container isFocused={isFocused} isErrored={!!error}>
        <Icon
          name={icon}
          size={20}
          color={isFocused || isFilled ? '#f99000' : '#666360'}
        />
        <TextInput
          ref={inputElementRef}
          placeholderTextColor="#666360"
          defaultValue={defaultValue}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChangeText={(value: string) => {
            inputValueRef.current.value = value;
          }}
          {...rest}
        />
      </Container>
    );
  },
);

export default Input;
