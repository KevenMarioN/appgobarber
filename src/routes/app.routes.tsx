import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import React from 'react';
import Dashboard from '../pages/Dashboard';

type AppRouteParamList = {
  Dashboard: undefined;
};

export type AppStack = StackNavigationProp<AppRouteParamList>;
const App = createStackNavigator<AppRouteParamList>();

const AppRoutes = (): JSX.Element => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: {
        backgroundColor: '#312e38',
      },
    }}
  >
    <App.Screen name="Dashboard" component={Dashboard} />
  </App.Navigator>
);

export default AppRoutes;
