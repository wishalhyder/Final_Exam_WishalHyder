import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NoteDetailScreen = ({ route, navigation }: any) => {
  const { note } = route.params; // note passed from Notes List
  const [title, setTitle] = useState(note.title);
  const [description, setDescription] = useState(note.description);
  const [isEditing, setIsEditing] = useState(false);

  // 🔹 Delete Note
  const handleDelete = async () => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this note?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            const storedNotes = await AsyncStorage.getItem('notes');
            const notes = storedNotes ? JSON.parse(storedNotes) : [];
            const updatedNotes = notes.filter((item: any) => item.id !== note.id);
            await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
            Alert.alert('Deleted', 'Note deleted successfully.');
            navigation.goBack();
          } catch (error) {
            console.error('Error deleting note:', error);
            Alert.alert('Error', 'Failed to delete note.');
          }
        },
      },
    ]);
  };

  // 🔹 Save Edited Note
  const handleSaveEdit = async () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert('Validation', 'Please fill in both Title and Description.');
      return;
    }

    try {
      const storedNotes = await AsyncStorage.getItem('notes');
      const notes = storedNotes ? JSON.parse(storedNotes) : [];

      const updatedNotes = notes.map((item: any) => {
        if (item.id === note.id) {
          return { ...item, title: title.trim(), description: description.trim() };
        }
        return item;
      });

      await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
      Alert.alert('Success', 'Note updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving edits:', error);
      Alert.alert('Error', 'Failed to update note.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Note Details</Text>

      {isEditing ? (
        <>
          {/* 🔹 Edit Mode Inputs */}
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter Title"
            placeholderTextColor="#B10808"
          />
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            value={description}
            onChangeText={setDescription}
            placeholder="Enter Description"
            placeholderTextColor="#B10808"
            multiline
            textAlignVertical="top"
          />
        </>
      ) : (
        <>
          {/* 🔹 View Mode */}
          <Text style={styles.noteTitle}>{title}</Text>
          <Text style={styles.noteDescription}>{description}</Text>
        </>
      )}

      <View style={styles.buttonContainer}>
        {isEditing ? (
          <>
            <TouchableOpacity style={[styles.btn, { backgroundColor: '#28a745' }]} onPress={handleSaveEdit}>
              <Text style={styles.btnText}>Save Changes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: '#6c757d' }]}
              onPress={() => setIsEditing(false)}
            >
              <Text style={styles.btnText}>Cancel</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: '#007bff' }]}
              onPress={() => setIsEditing(true)}
            >
              <Text style={styles.btnText}>Edit Note</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: '#dc3545' }]}
              onPress={handleDelete}
            >
              <Text style={styles.btnText}>Delete Note</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: '#1e1f1eff' }]}
              onPress={()=>navigation.navigate('NotesList')}
            >
              <Text style={styles.btnText}>Go back to list</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default NoteDetailScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 16,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 26,
    fontWeight: '700',
    color: '#B10808',
    textAlign: 'center',
    marginBottom: 20,
  },
  noteTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#B10808',
    marginBottom: 10,
  },
  noteDescription: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#fff',
    width: '100%',
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
  buttonContainer: {
    marginTop: 20,
  },
  btn: {
    width: '100%',
    height: 45,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
});
