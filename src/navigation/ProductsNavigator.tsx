import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { ProductSreen } from '../screens/ProductSreen';
import { ProductsScreen } from '../screens/ProductsScreen';

export type ProductsStackParams = {
  Products: undefined;
  Product: { id?: string; name?: string };
};

const Stack = createStackNavigator();

export const ProductsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Products" component={ProductsScreen} />
      <Stack.Screen name="Product" component={ProductSreen} />
    </Stack.Navigator>
  );
};
