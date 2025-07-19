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
import ScreenWrapper from '../components/ScreenWrapper'; // 👉 chỉnh lại path nếu cần

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; // đường dẫn tùy vào vị trí file firebase.js

const SignUpScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    email: '',
    username: '',
    password: '',
    city: '',
    phone: '',
  });

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Image
              source={require('./Picture/LoginPicture.png')}
              style={styles.avatar}
            />
            {['email', 'username', 'password', 'city', 'phone'].map(
              (field, index) => (
                <View style={styles.inputContainer} key={index}>
                  <TextInput
                    style={styles.input}
                    placeholder={`Enter your ${field}`}
                    secureTextEntry={field === 'password'}
                    value={form[field]}
                    onChangeText={(value) => handleChange(field, value)}
                  />
                </View>
              )
            )}

            {/* Sign Up Button */}
            <TouchableOpacity
              style={styles.signupButton}
              onPress={async () => {
                try {
                  const { email, password } = form;
                  if (!email || !password) {
                    alert('Please fill in all required fields.');
                    return;
                  }

                  await createUserWithEmailAndPassword(auth, email, password);
                  alert('Registration successful!');
                  navigation.navigate('Login');
                } catch (error) {
                  console.error(error);
                  alert('Registration failed: ' + error.message);
                }
              }}
            >
              <Text style={styles.signupText}>Sign up</Text>
            </TouchableOpacity>

            {/* Navigate to Login */}
            <Text style={styles.loginText}>
              You already have an account?{' '}
              <Text
                style={styles.loginLink}
                onPress={() => navigation.navigate('Login')}
              >
                Log in
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
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 40,
    marginBottom: 20,
  },
  inputContainer: {
    backgroundColor: '#f2f2f2',
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 12,
    width: '100%',
    marginBottom: 15,
  },
  input: {
    fontSize: 16,
    color: '#333',
  },
  signupButton: {
    backgroundColor: '#000',
    paddingVertical: 12,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    marginTop: 5,
  },
  signupText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  loginText: {
    marginTop: 20,
    fontSize: 14,
    color: '#333',
  },
  loginLink: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default SignUpScreen;
