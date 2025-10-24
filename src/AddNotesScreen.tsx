import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddNotesScreen = ({ navigation }: any) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // 🔹 Handle Save Note
  const handleSave = async () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert('Missing Fields', 'Please enter both title and description.');
      return;
    }

    try {
      // Fetch existing notes
      const storedNotes = await AsyncStorage.getItem('notes');
      const notes = storedNotes ? JSON.parse(storedNotes) : [];

      // Create a new note object
      const newNote = {
        id: Date.now().toString(),
        title: title.trim(),
        description: description.trim(),
      };

      // Save updated notes array
      await AsyncStorage.setItem('notes', JSON.stringify([...notes, newNote]));

      Alert.alert('Success', 'Note saved successfully!');
      navigation.goBack(); // ⬅️ Return to Notes List
    } catch (error) {
      Alert.alert('Error', 'Failed to save note.');
      console.error('Save note error:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <Text style={styles.heading}>Add New Note</Text>

        {/* 🔹 Title Input */}
        <TextInput
          style={styles.input}
          placeholder="Enter Note Title"
          value={title}
          onChangeText={setTitle}
          placeholderTextColor="#B10808"
        />

        {/* 🔹 Description Input */}
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder="Enter Note Description"
          value={description}
          onChangeText={setDescription}
          multiline
          textAlignVertical="top"
          placeholderTextColor="#B10808"
        />

        {/* 🔹 Save Button */}
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.btnText}>Save Note</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddNotesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  heading: {
    fontSize: 26,
    fontWeight: '700',
    color: '#B10808',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    width: '90%',
    height: 45,
    elevation: 3,
    borderRadius: 5,
    padding: 10,
    color: '#B10808',
    fontSize: 14,
    marginVertical: 10,
    borderWidth: 0.5,
    borderColor: '#B10808',
  },
  descriptionInput: {
    height: 150,
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
    fontWeight: '500',
    fontSize: 16,
  },
});
