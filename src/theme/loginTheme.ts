import { StyleSheet } from 'react-native';

const loginTheme = StyleSheet.create({
  formContainer: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center',
    height: 600,
    marginBottom: 50,
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  label: {
    marginTop: 25,
    color: 'white',
  },
  input: {
    color: 'white',
    fontSize: 18,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  button: {
    borderWidth: 2,
    borderColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 100,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
  registerContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
});

export default loginTheme;
