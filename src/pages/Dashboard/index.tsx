import React from 'react';
import { Button, View } from 'react-native';
import { useAuth } from '../../hooks/useAuth';

const Dashboard = () => {
  const { signOut } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Button title="Sair" onPress={signOut} />
    </View>
  );
};

export default Dashboard;
