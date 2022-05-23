import React, { ReactNode } from 'react';
import { AuthProvider } from './useAuth';

type AppProviderProps = {
  children: ReactNode;
};

export default function AppProvider({
  children,
}: AppProviderProps): JSX.Element {
  return <AuthProvider>{children}</AuthProvider>;
}
