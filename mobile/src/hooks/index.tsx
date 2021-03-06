import React from 'react';
import { AuthProvider } from './auth';

const AppProvider: React.FC = ({ children }) => {
  // ! a ordem que for colocar os hooks
  // ? Apenas se um hook depender do outro
  return <AuthProvider>{children}</AuthProvider>;
};

export default AppProvider;