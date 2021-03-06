import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useEffect } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Background } from '../components/Background';
import { WhiteLogo } from '../components/WhiteLogo';
import { AuthContext } from '../context/AuthContext';
import { useForm } from '../hooks/useForm';
import loginTheme from '../theme/loginTheme';

interface Props extends StackScreenProps<any, any> {}

export const LoginScreen = ({ navigation }: Props) => {
  const { signIn, errorMessage, removeError } = useContext(AuthContext);
  const {
    value: { email, password },
    onChange,
  } = useForm({ email: 'tom@tom.tom', password: '123456' });

  const handleLogin = () => {
    Keyboard.dismiss();
    signIn({ correo: email, password });
  };

  useEffect(() => {
    if (errorMessage) {
      Alert.alert('Login failure', errorMessage, [
        { text: 'Ok', onPress: removeError },
      ]);
    }
  }, [errorMessage, removeError]);

  return (
    <>
      <Background />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={loginTheme.formContainer}>
          <WhiteLogo />

          <Text style={loginTheme.title}>Login</Text>

          <TextInput
            placeholder="Email"
            placeholderTextColor="#f3e5f5"
            keyboardType="email-address"
            underlineColorAndroid="white"
            autoCapitalize="none"
            autoCorrect={false}
            style={loginTheme.input}
            onChangeText={val => onChange(val, 'email')}
            value={email}
            onSubmitEditing={handleLogin}
          />

          <TextInput
            placeholder="Password"
            placeholderTextColor="#f3e5f5"
            secureTextEntry
            underlineColorAndroid="white"
            autoCapitalize={'none'}
            style={loginTheme.input}
            onChangeText={val => onChange(val, 'password')}
            value={password}
            onSubmitEditing={handleLogin}
          />

          <View style={loginTheme.buttonContainer}>
            <TouchableOpacity
              style={loginTheme.button}
              activeOpacity={0.8}
              onPress={handleLogin}>
              <Text style={loginTheme.buttonText}>Sign in</Text>
            </TouchableOpacity>
          </View>

          <View style={loginTheme.registerContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Register')}>
              <Text style={loginTheme.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};
