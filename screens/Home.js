import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';

const Home = ({navigation, route}) => {
  const [todos, setTodos] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (route.params?.newTodo) {
      setTodos(prevTodos => [...prevTodos, route.params.newTodo]);
    }
  }, [route.params?.newTodo]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.item, item.done && styles.finishedItem]}
      onPress={() => navigation.navigate('Detail', { todo: item, setTodos })}
    >
      <Text style={[styles.title, item.done && styles.finishedTitle]}>{item.title}</Text>
      <Text style={styles.arrow}> &gt; </Text>
    </TouchableOpacity>
  );

  const unfinishedTodos = todos.filter(todo => !todo.done);
  const finishedTodos = todos.filter(todo => todo.done);

  return (
    <View style={styles.container}>
      <FlatList
        data={unfinishedTodos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={isFocused}
      />
      <Text style={styles.sectionHeader}>Finished Tasks</Text>
      <FlatList
      data={finishedTodos}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      extraData={isFocused}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  sectionHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#f9c2ff',
    borderRadius: 10,
  },
  finishedItem: {
    backgroundColor: '#008000',
  },
  title: {
    fontSize: 24,
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
  finishedTitle: {
    textDecorationLine: 'line-through',
  },
  arrow: {
    fontSize: 24,
    color: '#000',
  },
});

export default Home;
