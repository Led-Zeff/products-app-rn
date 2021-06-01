import React from 'react';
import { AuthProvider } from './AuthContext';
import { ProductsProvider } from './ProductsContext';

export const AppState = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  return (
    <AuthProvider>
      <ProductsProvider>{children}</ProductsProvider>
    </AuthProvider>
  );
};
