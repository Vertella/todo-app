import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Add = ({ route }) => {
    const { setTodos } = route.params;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setParams({ handleAdd });
  }, [title, description]);

  const handleAdd = () => {
    const newTodo = { id: Date.now().toString(), title, description };
    route.params.setTodos(prevTodos => [...prevTodos, newTodo]);
    navigation.navigate('Home', { newTodo });
  };

  return (
    <View style={styles.container}>
        <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />
      </View>
        <View style={styles.descriptionContainer}>
            <TextInput
            style={styles.descriptionInput}
            placeholder='Description'
            value={description}
            onChangeText={setDescription}
            multiline
            />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  inputContainer: {
    width: '100%',
    padding: 16,
    marginVertical: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  input: {
    fontSize: 18,
    textAlign: 'left',
  },
  descriptionContainer: {
    width: '100%',
    padding: 16,
    marginVertical: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  descriptionInput: {
    fontSize: 18,
    textAlign: 'left',
  },
});

export default Add;
