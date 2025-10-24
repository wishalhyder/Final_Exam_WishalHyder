import React from 'react';
import { useColorScheme, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import LoginScreen from './src/LoginScreen';
import SignupScreen from './src/SignupScreen';
import NotedList from './src/NotedList';
import AddNotesScreen from './src/AddNotesScreen';
import NoteDetailScreen from './src/NoteDetailScreen';
import UserProfileScreen from './src/UserProfileScreen';
import EditNote from './src/EditNote';

const Stack = createNativeStackNavigator();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="AddNotes" component={AddNotesScreen} />
          <Stack.Screen name="EditNote" component={EditNote} />
          <Stack.Screen name="NotesList" component={NotedList} />
          <Stack.Screen name="ViewNote" component={NoteDetailScreen} />
          <Stack.Screen name="UserProfile" component={UserProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
