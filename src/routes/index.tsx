import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import React from 'react';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

export type AuthStack = StackNavigationProp<RootStackParamList>;
const Auth = createStackNavigator<RootStackParamList>();

const AuthRoutes = (): JSX.Element => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: {
        backgroundColor: '#312e38',
      },
    }}
    initialRouteName="SignIn"
  >
    <Auth.Screen name="SignIn" component={SignIn} />
    <Auth.Screen name="SignUp" component={SignUp} />
  </Auth.Navigator>
);

export default AuthRoutes;
