import AsyncStorage from '@react-native-community/async-storage';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import api from '../http/api';

type AuthContextProps = {
  children: ReactNode;
};

interface AuthState {
  token: string;
  user: object;
}
interface SignInCredentials {
  email: string;
  password: string;
}
interface AuthContextData {
  user: object;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider = ({ children }: AuthContextProps): JSX.Element => {
  const [data, setData] = useState<AuthState>({} as AuthState);

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await api.post<AuthState>('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    setData({ token, user });
    await AsyncStorage.multiSet([
      ['@GoBarber:token', token],
      ['@GoBarber:user', JSON.stringify(user)],
    ]);
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@GoBarber:token', '@GoBarber:user']);
    setData({} as AuthState);
  }, []);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@GoBarber:token',
        '@GoBarber:user',
      ]);

      if (token[1] && user[1]) {
        setData({ token: token[1], user: JSON.parse(user[1]) });
      }
    }
    loadStorageData();
  }, []);
  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
