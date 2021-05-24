import React from 'react';
import { StyleSheet, View } from 'react-native';

export const Background = () => {
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: '#6a1b9a',
    top: -250,
    width: 800,
    height: 900,
    transform: [{ rotate: '-80deg' }],
  },
});
