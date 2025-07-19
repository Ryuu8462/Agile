import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '../components/ScreenWrapper'; // import wrapper 

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';


const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ScreenWrapper> {/* Bọc trong wrapper */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Image source={require('./Picture/LoginPicture.png')} style={styles.avatar} />

            <TextInput
              style={styles.input}
              placeholder="Email/Username"
              value={email}
              onChangeText={setEmail}
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.button} 
              onPress={async () => {
                try {
                  if (!email || !password) {
                    alert('Please enter both email and password.');
                    return;
                  }

                  await signInWithEmailAndPassword(auth, email, password);
                  navigation.navigate('Home');
                } catch (error) {
                  console.error(error);
                  alert('Login failed: ' + error.message);
                }
              }}
            >
              <Text style={styles.buttonText}>Log in</Text>
            </TouchableOpacity>

            <Text style={styles.signUpText}>
              You don't have an account?
              <Text style={styles.signUpLink} onPress={() => navigation.navigate('Register')}>
                {' '}Sign up
              </Text>
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 50,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 30,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  signUpText: {
    marginTop: 10,
    fontSize: 14,
  },
  signUpLink: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
