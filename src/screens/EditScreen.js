import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, ScrollView, Alert } from 'react-native';

const EditScreen = ({ route, navigation }) => {
  const { item, onSave } = route.params;

  const [title, setTitle] = useState(item.title);
  const [genre, setGenre] = useState(item.genre);
  const [director, setDirector] = useState(item.director);
  const [status, setStatus] = useState(item.status);
  const [releaseYear, setReleaseYear] = useState(item.releaseYear.toString());
  const [image, setImage] = useState(item.image);

  const handleSave = async () => {
    const updatedItem = {
      ...item,
      title,
      genre,
      director,
      status,
      releaseYear: parseInt(releaseYear),
      image,
    };

    try {
      const response = await fetch(`https://671a5c8aacf9aa94f6aa583f.mockapi.io/books/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedItem),
      });

      if (response.ok) {
        onSave(updatedItem); 
        Alert.alert("Success", "Data updated successfully!");
        navigation.goBack();
      } else {
        Alert.alert("Error", "Failed to update data.");
      }
    } catch (error) {
      console.error("Error updating data:", error);
      Alert.alert("Error", "An error occurred while updating data.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      <Text style={styles.label}>Genre</Text>
      <TextInput
        style={styles.input}
        value={genre}
        onChangeText={setGenre}
      />
      <Text style={styles.label}>Director</Text>
      <TextInput
        style={styles.input}
        value={director}
        onChangeText={setDirector}
      />
      <Text style={styles.label}>Status</Text>
      <TextInput
        style={styles.input}
        value={status}
        onChangeText={setStatus}
      />
      <Text style={styles.label}>Release Year</Text>
      <TextInput
        style={styles.input}
        value={releaseYear}
        keyboardType="numeric"
        onChangeText={setReleaseYear}
      />
      <Button title="Save" onPress={handleSave} color="#007BFF" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
    backgroundColor: '#e0e0e0',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 8,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
  },
});

export default EditScreen;
