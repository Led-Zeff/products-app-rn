import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext } from 'react';
import {
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

export const RegisterScreen = ({ navigation }: Props) => {
  const { signUp } = useContext(AuthContext);
  const {
    value: { name, email, password },
    onChange,
  } = useForm({ name: '', email: '', password: '' });

  const handleRegister = () => {
    Keyboard.dismiss();
    signUp({ nombre: name, correo: email, password });
  };

  return (
    <>
      <Background />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={loginTheme.formContainer}>
          <WhiteLogo />

          <Text style={loginTheme.title}>Register</Text>

          <TextInput
            placeholder="Name"
            placeholderTextColor="#f3e5f5"
            keyboardType="email-address"
            underlineColorAndroid="white"
            autoCapitalize="words"
            autoCorrect={false}
            style={loginTheme.input}
            onChangeText={val => onChange(val, 'name')}
            value={name}
            onSubmitEditing={handleRegister}
          />

          <TextInput
            placeholder="Email"
            placeholderTextColor="#f3e5f5"
            keyboardType="email-address"
            underlineColorAndroid="white"
            autoCapitalize={'none'}
            style={loginTheme.input}
            onChangeText={val => onChange(val, 'email')}
            value={email}
            onSubmitEditing={handleRegister}
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
            onSubmitEditing={handleRegister}
          />

          <View style={loginTheme.buttonContainer}>
            <TouchableOpacity
              style={loginTheme.button}
              activeOpacity={0.8}
              onPress={handleRegister}>
              <Text style={loginTheme.buttonText}>Sign up</Text>
            </TouchableOpacity>
          </View>

          <View style={loginTheme.registerContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.pop()}>
              <Text style={loginTheme.buttonText}>
                Already have an account?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};
