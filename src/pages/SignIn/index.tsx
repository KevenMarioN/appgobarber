import React from 'react';
import { Image, View } from 'react-native';

import { Container, Title } from './styles';
import logoImg from '../../assets/logo.png';

function SignIn(): JSX.Element {
  return (
    <Container>
      <Image source={logoImg} />
      <Title>Faça seu logon</Title>
    </Container>
  );
}

export default SignIn;
