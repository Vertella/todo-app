import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Detail = ({ route, navigation }) => {
  const { todo, setTodos } = route.params;

  const handleDone = () => {
    setTodos(prevTodos =>
        prevTodos.map(t => t.id === todo.id ? { ...t, done: !t.done } : t)
      );
      navigation.goBack();
  };

  const handleDelete = () => {
    setTodos(prevTodos => prevTodos.filter(t => t.id !== todo.id));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
        <View style={styles.descriptionContainer}>
            <Text style={[styles.title, todo.done && styles.done]}>{todo.title}</Text>
            <Text style={styles.description}>{todo.description}</Text>
        </View>
      <Button title={todo.done ? "Undo" : "Done"} onPress={handleDone} />
      <View style={styles.deleteButtonContainer}>
        <Button title="Delete" color="red" onPress={handleDelete} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  descriptionContainer: {
    width: '100%',
    padding: 16,
    marginVertical: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    alignItems: 'center',
  },
  description: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: 'center',
  },
  done: {
    textDecorationLine: 'line-through',
  },
  deleteButtonContainer: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignItems: 'center',
  },
});

export default Detail;
