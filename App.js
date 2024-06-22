import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import Detail from './screens/Detail';
import Add from './screens/Add';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useState } from 'react';

const Stack = createNativeStackNavigator();

export default function App() {
const [todos, setTodos] = useState([]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6200ea', // Background color of the header
        },
        headerTintColor: '#ffffff', // Color of the header title and icons
        headerTitleStyle: {
          fontWeight: 'bold', // Make the title bold
          fontSize: 24, // Increase the font size of the title
        },
        headerTitleAlign: 'center', // Center align the header title
      }}
      >


      <Stack.Screen 
        name="Home" 
        component={Home}
        initialParams={{ todos, setTodos }} 
        options={({ navigation }) => ({
          title: 'Todos',
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 10 }}
              onPress={() => navigation.navigate('Add', {setTodos})}
            >
              <Text style={{ color: 'white', fontSize: 16 }}>Add</Text>
            </TouchableOpacity>
          ),
        })} />


      <Stack.Screen 
        name="Detail" 
        component={Detail}
        options={({ route }) => ({ title: route.params.todo.title })}
        />
        <Stack.Screen
          name="Add"
          component={Add} 
        options={({ route }) => ({
          title: 'Add Todo',
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 10 }}
              onPress={route.params.handleAdd}
            >
              <Text style={{ color: 'blue', fontSize: 16 }}>Done</Text>
            </TouchableOpacity>
          ),
          presentation: 'modal',
        })}
      />
    </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
