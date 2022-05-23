import React from 'react';
import { View, StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import Router from './routes';
import AppProvider from './hooks';

const App = (): JSX.Element => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#212e38" />
      <AppProvider>
        <View style={{ flex: 1, backgroundColor: '#312e38' }}>
          <Router />
        </View>
      </AppProvider>
    </NavigationContainer>
  );
};

export default App;
