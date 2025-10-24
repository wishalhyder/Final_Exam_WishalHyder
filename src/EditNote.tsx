import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditNote = ({ route, navigation }: any) => {
  const { note } = route.params; // note passed from NotedList
  const [title, setTitle] = useState(note.title);
  const [description, setDescription] = useState(note.description);

  // 🔹 Handle update
  const handleUpdate = async () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert('Missing Fields', 'Please fill out all fields.');
      return;
    }

    try {
      const storedNotes = await AsyncStorage.getItem('notes');
      if (storedNotes) {
        const notes = JSON.parse(storedNotes);

        // Find and update the note
        const updatedNotes = notes.map((n: any) =>
          n.id === note.id ? { ...n, title, description } : n
        );

        await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));

        Alert.alert('Success', 'Note updated successfully!');
        navigation.goBack(); // Go back to the notes list
      }
    } catch (error) {
      console.log('Error updating note:', error);
      Alert.alert('Error', 'Failed to update note.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Edit Note</Text>

      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor="#B10808"
      />
      <TextInput
        style={[styles.input, { height: 120, textAlignVertical: 'top' }]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        placeholderTextColor="#B10808"
      />

      <TouchableOpacity style={styles.saveBtn} onPress={handleUpdate}>
        <Text style={styles.btnText}>Update Note</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditNote;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 40,
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
    borderWidth: 0.5,
    borderColor: '#B10808',
    borderRadius: 5,
    elevation: 3,
    padding: 10,
    color: '#B10808',
    fontSize: 14,
    marginBottom: 15,
  },
  saveBtn: {
    backgroundColor: '#B10808',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 45,
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
