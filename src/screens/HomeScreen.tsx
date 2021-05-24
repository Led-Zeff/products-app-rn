import React, { useContext } from 'react';
import { Button, Text, View } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export const HomeScreen = () => {
  const { logout, user } = useContext(AuthContext);

  return (
    <View>
      <Text>{JSON.stringify(user, null, 4)}</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
};
