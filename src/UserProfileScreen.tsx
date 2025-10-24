import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as ImagePicker from 'expo-image-picker'; // optional if you want to change profile picture

const UserProfileScreen = () => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // 🔹 Load user data from AsyncStorage
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setFullName(userData.fullName || '');
          setUsername(userData.username || '');
          setEmail(userData.email || '');
          setProfileImage(userData.profileImage || null);
        }
      } catch (error) {
        console.error('Error loading user:', error);
      }
    };
    loadUserData();
  }, []);

  // 🔹 Pick a profile image (optional feature)
//   const pickImage = async () => {
//     const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (!permission.granted) {
//       Alert.alert('Permission Denied', 'Please allow photo access to select a profile picture.');
//       return;
//     }

//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       quality: 0.5,
//       allowsEditing: true,
//       aspect: [1, 1],
//     });

//     if (!result.canceled) {
//       setProfileImage(result.assets[0].uri);
//     }
//   };

  // 🔹 Save updated user data to AsyncStorage
  const handleSave = async () => {
    if (!fullName.trim() || !username.trim() || !email.trim()) {
      Alert.alert('Missing Fields', 'Please fill in all details.');
      return;
    }

    const updatedUser = {
      fullName: fullName.trim(),
      username: username.trim(),
      email: email.trim(),
      profileImage,
    };

    try {
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      Alert.alert('Success', 'Profile updated successfully!');
    } catch (error) {
      console.error('Error saving user:', error);
      Alert.alert('Error', 'Failed to save profile.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>User Profile</Text>

      {/* 🔹 Profile Image */}
      {/* <TouchableOpacity onPress={pickImage}> */}
        <Image
  source={
    profileImage
      ? { uri: profileImage }
      : require('../assets/default_profile.png')
  }
  style={styles.profileImage}
/>
        <Text style={styles.changePhotoText}>Profile Photo</Text>
      {/* </TouchableOpacity> */}

      {/* 🔹 Input Fields */}
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
        placeholderTextColor="#B10808"
      />

      {/* 🔹 Save Button */}
      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.btnText}>Save Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 16,
    alignItems: 'center',
  },
  heading: {
    fontSize: 26,
    fontWeight: '700',
    color: '#B10808',
    marginVertical: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#B10808',
    marginBottom: 10,
  },
  changePhotoText: {
    color: '#B10808',
    fontSize: 14,
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
    marginVertical: 10,
    borderWidth: 0.5,
    borderColor: '#B10808',
  },
  saveBtn: {
    width: '90%',
    height: 45,
    marginTop: 20,
    backgroundColor: '#B10808',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
