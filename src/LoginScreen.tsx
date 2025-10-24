import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }: any) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [storedUser, setStoredUser] = useState<any>(null);

  // 🔹 Load saved user data from AsyncStorage
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        console.log(userData);
        if (userData) {
          setStoredUser(JSON.parse(userData));
        }
      } catch (error) {
        console.log('Error loading user data:', error);
      }
    };
    loadUserData();
  }, []);

  // 🔹 Handle Login
  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Missing Fields', 'Please enter both username and password.');
      return;
    }

    if (!storedUser) {
      Alert.alert('Error', 'No user found. Please sign up first.');
      return;
    }

    if (username === storedUser.username && password === storedUser.password) {
      Alert.alert('Success', 'Login successful!');
      navigation.navigate('NotesList'); // navigate to Notes List Page
    } else {
      Alert.alert('Login Failed', 'Invalid username or password.');
    }
  };

  return (
    <View style={styles.container}>
      {/* 🔹 App Logo */}
      {/* <Image
        source={require('../assets/app_logo.png')} // replace with your logo path
        style={styles.logo}
        resizeMode="contain"
      /> */}

      {/* 🔹 Heading */}
      <Text style={styles.heading}>Welcome Back</Text>
      <Text style={styles.subHeading}>Login to continue</Text>

      {/* 🔹 Username Input */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        placeholderTextColor="#B10808"
      />

      {/* 🔹 Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#B10808"
      />

      {/* 🔹 Login Button */}
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>

      {/* 🔹 Signup Link */}
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.signupText}>
          No account? <Text style={styles.signupLink}>Signup</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  heading: {
    fontSize: 26,
    fontWeight: '700',
    color: '#B10808',
    marginBottom: 5,
  },
  subHeading: {
    fontSize: 16,
    fontWeight: '400',
    color: '#B10808',
    marginBottom: 20,
  },
  input: {
    width: '90%',
    height: 45,
    backgroundColor: '#fff',
    elevation: 3,
    borderRadius: 5,
    padding: 10,
    color: '#B10808',
    fontSize: 14,
    marginVertical: 8,
    borderWidth: 0.5,
    borderColor: '#B10808',
  },
  loginBtn: {
    width: '90%',
    height: 45,
    marginTop: 20,
    backgroundColor: '#B10808',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  btnText: {
    color: '#ffffff',
    fontWeight: '500',
    fontSize: 16,
  },
  signupText: {
    marginTop: 15,
    fontSize: 14,
    color: '#B10808',
  },
  signupLink: {
    fontWeight: '700',
  },
});
