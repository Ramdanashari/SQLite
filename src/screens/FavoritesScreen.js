import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

const FavoritesScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.log(error);
      }
    };

    const unsubscribe = navigation.addListener('focus', fetchFavorites);

    return unsubscribe;
  }, [navigation]);

  const deleteFavorite = async (id) => {
    const updatedFavorites = favorites.filter((item) => item.id !== id);
    setFavorites(updatedFavorites);
    await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const confirmDelete = (id) => {
    Alert.alert(
      "Delete Favorite",
      "kamu yakin akan mengahpus buku favorites?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => deleteFavorite(id), style: "destructive" },
      ]
    );
  };

  const renderFavoriteItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => navigation.navigate('ProductDetailScreen', { item })}
      >
        <Image source={{ uri: item.imageUrl || item.image }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.category}>{item.director}</Text>
          <Text style={styles.category}>{item.rating}</Text>
          <Text style={styles.category}>{item.genre}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => confirmDelete(item.id)} style={styles.deleteButton}>
        <Ionicons name="trash" size={24} color="#FF3B30" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favorites</Text>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          renderItem={renderFavoriteItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      ) : (
        <Text style={styles.emptyText}>No favorites added yet.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4FA',
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#4A4A4A',
    textAlign: 'center',
  },
  list: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 15,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    width: 70,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  category: {
    fontSize: 14,
    color: '#888888',
    marginTop: 4,
  },
  deleteButton: {
    padding: 8,
    marginLeft: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#888888',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default FavoritesScreen;
