import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Note {
  id: string;
  title: string;
  description: string;
}

const NotedList = ({ navigation }: any) => {
  const [notes, setNotes] = useState<Note[]>([]);

  // 🔹 Load notes from AsyncStorage
  useEffect(() => {
    const loadNotes = async () => {
      try {
        const storedNotes = await AsyncStorage.getItem('notes');
        if (storedNotes) {
          setNotes(JSON.parse(storedNotes));
        }
      } catch (error) {
        console.log('Error loading notes:', error);
      }
    };
    const unsubscribe = navigation.addListener('focus', loadNotes);
    return unsubscribe;
  }, [navigation]);

  // 🔹 Delete note
  const handleDelete = async (id: string) => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this note?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const updatedNotes = notes.filter(note => note.id !== id);
          setNotes(updatedNotes);
          await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
        },
      },
    ]);
  };

  // 🔹 Render each note item
  const renderItem = ({ item }: { item: Note }) => (
    <View style={styles.noteCard}>
      <View style={{ flex: 1 }}>
        <Text style={styles.noteTitle}>{item.title}</Text>
        <Text style={styles.notePreview}>
          {item.description.length > 60
            ? item.description.substring(0, 60) + '...'
            : item.description}
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: '#007bff' }]}
          onPress={() => navigation.navigate('ViewNote', { note: item })}
        >
          <Text style={styles.actionText}>View</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: '#28a745' }]}
          onPress={() => navigation.navigate('EditNote', { note: item })}
        >
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: '#dc3545' }]}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.actionText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* 🔹 View Profile Link */}
      <TouchableOpacity
        style={styles.profileLinkContainer}
        onPress={() => navigation.navigate('UserProfile')}
      >
        <Text style={styles.profileLink}>👤 View Profile</Text>
      </TouchableOpacity>

      <Text style={styles.heading}>My Notes</Text>

      {notes.length === 0 ? (
        <Text style={styles.emptyText}>No notes found. Add one!</Text>
      ) : (
        <FlatList
          data={notes}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}

      {/* 🔹 Add Note Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddNotes')}
      >
        <Text style={styles.addButtonText}>+ Add Note</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NotedList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  profileLinkContainer: {
    alignSelf: 'flex-end',
    marginBottom: 10,
    marginRight: 5,
  },
  profileLink: {
    color: '#B10808',
    fontWeight: '600',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  heading: {
    fontSize: 26,
    fontWeight: '700',
    color: '#B10808',
    marginBottom: 20,
    textAlign: 'center',
  },
  noteCard: {
    backgroundColor: '#f9e6e6',
    borderRadius: 8,
    padding: 15,
    marginBottom: 12,
    elevation: 3,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#B10808',
  },
  notePreview: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  actionBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginHorizontal: 3,
  },
  actionText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    color: '#B10808',
    fontSize: 16,
    marginTop: 40,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#B10808',
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 20,
    elevation: 5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
