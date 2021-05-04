import React, { createContext, useCallback, useContext, useState } from 'react';
import Cookies from 'js-cookie'

import api from '../services/api'

interface User {
  id: string;
  name: string;
  email: string
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    if (typeof window !== 'undefined') {
      const token = Cookies.get('dribbleChallengeToken');
      const user = Cookies.get('dribbleChallengeUser');

      if (token && user) {
        api.defaults.headers.authorization = `Bearer ${token}`;

        return { token, user: JSON.parse(user) };
      }

      return {} as AuthState;
    }
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('session', {
      email,
      password,
    });

    const { token, user } = response.data;

    Cookies.set('dribbleChallengeToken', token);
    Cookies.set('dribbleChallengeUser', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    Cookies.remove('dribbleChallengeToken');
    Cookies.remove('dribbleChallengeUser');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: data?.user, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
