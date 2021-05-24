import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useReducer, useEffect } from 'react';
import kaffeeApi from '../api/kaffeeApi';
import {
  AppUser,
  LoginRequest,
  LoginResponse,
  SignUpRequest,
} from '../model/user';
import { authReducer, AuthState } from './authReducer';

type AuthContextProps = {
  user?: AppUser;
  token?: string;
  errorMessage?: string;
  status: 'verifying' | 'authenticated' | 'unauthenticated';
  signIn: (user: LoginRequest) => void;
  signUp: (user: SignUpRequest) => void;
  logout: () => void;
  removeError: () => void;
};

const authInitialState: AuthState = {
  status: 'verifying',
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);

  const signIn = async (user: LoginRequest) => {
    try {
      const {
        data: { token, usuario },
      } = await kaffeeApi.post<LoginResponse>('/auth/login', user);

      dispatch({ type: 'sign-in', payload: { token, user: usuario } });
      AsyncStorage.setItem('token', token);
    } catch (error) {
      console.log(error.response?.data?.msg);
      dispatch({
        type: 'set-error',
        payload: error.response?.data?.msg ?? 'An error ocurred',
      });
    }
  };

  const signUp = async (user: SignUpRequest) => {
    try {
      const {
        data: { token, usuario },
      } = await kaffeeApi.post<LoginResponse>('/usuarios', user);

      dispatch({ type: 'sign-in', payload: { token, user: usuario } });
      AsyncStorage.setItem('token', token);
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'set-error',
        payload: error.response?.data?.errors[0]?.msg ?? 'An error ocurred',
      });
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    dispatch({ type: 'logout' });
  };

  const removeError = () => dispatch({ type: 'remove-error' });

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      dispatch({ type: 'unauthenticate' });
      return;
    }

    try {
      const {
        data: { token: newToken, usuario },
      } = await kaffeeApi.get<LoginResponse>('/auth');

      dispatch({
        type: 'sign-in',
        payload: { token: newToken, user: usuario },
      });
      AsyncStorage.setItem('token', newToken);
    } catch (error) {
      console.log(error);
      dispatch({ type: 'unauthenticate' });
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{ signIn, signUp, logout, removeError, ...state }}>
      {children}
    </AuthContext.Provider>
  );
};
