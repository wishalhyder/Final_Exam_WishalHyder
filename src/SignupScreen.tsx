import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignupScreen({ navigation }: any) {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  // 📸 Pick profile image
  const handleImagePick = async () => {
    const result: any = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
    });

    if (!result.didCancel && result.assets && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri);
    }
  };

  // 🧾 Validate and Signup
  const handleSignup = async () => {
    if (!fullName || !username || !email || !password || !confirmPassword) {
      Alert.alert('Missing Fields', 'Please fill out all fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match.');
      return;
    }

    try {
      // Save user info in AsyncStorage
      const userData = {
        fullName,
        username,
        email,
        password,
        profileImage,
      };
      await AsyncStorage.setItem('user', JSON.stringify(userData));

      Alert.alert('Success', 'Signup successful!');
      navigation.navigate('Login');
    } catch (e) {
      setError('Error saving user data.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.imgContainer} onPress={handleImagePick}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImg} />
        ) : (
          <Text style={{ color: '#B10808' }}>Select Profile Image</Text>
        )}
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
        placeholderTextColor="#B10808"
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        placeholderTextColor="#B10808"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#B10808"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#B10808"
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        placeholderTextColor="#B10808"
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity onPress={handleSignup} style={styles.loginBtn}>
        <Text style={styles.btnText}>Signup</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.signText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  imgContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F9E6E6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 5,
  },
  profileImg: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  input: {
    backgroundColor: '#fff',
    width: '90%',
    height: 45,
    elevation: 3,
    borderRadius: 5,
    padding: 10,
    color: '#B10808',
    fontWeight: '400',
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
    fontSize: 15,
  },
  signText: {
    fontWeight: '400',
    fontSize: 13,
    color: '#B10808',
    marginTop: 15,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});
