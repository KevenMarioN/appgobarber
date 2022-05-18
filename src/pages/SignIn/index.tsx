import React from 'react';
import { Image, View } from 'react-native';

import { Container } from './styles';
import logoImg from '../../assets/logo.png';
const SignIn = (): JSX.Element => {
  return (<Container>
    <Image source={logoImg} />
  </Container>);
}

export default SignIn;