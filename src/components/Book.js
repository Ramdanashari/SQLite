import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const BookCard = ({ title, genre, status, imageUrl, item, navigation, onDelete, onSaveEdit, searchQuery }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const handleEllipsisPress = () => {
    setMenuVisible(prev => !prev);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://671a5c8aacf9aa94f6aa583f.mockapi.io/books/${item.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMenuVisible(false);
        onDelete(item.id);
        Alert.alert("Success", "Item berhasil dihapus");
      } else {
        Alert.alert("Error", "gagal menghapus item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      Alert.alert("Error", "An error occurred while trying to delete the item");
    }
  };

  const handleEdit = () => {
    navigation.navigate('EditScreen', { 
      item, 
      onSave: updatedItem => {
        onSaveEdit(updatedItem); 
        setMenuVisible(false);
      }
    });
  };
  

  const highlightText = (text, query) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <Text key={index} style={styles.highlighted}>{part}</Text>
      ) : (
        <Text key={index}>{part}</Text>
      )
    );
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ProductDetail', { item })}
    >
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.overlay}>
        <Text style={styles.title}>{highlightText(title, searchQuery)}</Text>
        <Text style={styles.genre}>{highlightText(genre, searchQuery)}</Text>
      </View>

      <TouchableOpacity style={styles.statusIcon} onPress={handleEllipsisPress}>
        <Ionicons
          name="ellipsis-vertical"
          size={20}
          color="#fff"
        />
      </TouchableOpacity>

      {menuVisible && (
        <View style={styles.inlineMenu}>
          <TouchableOpacity onPress={handleEdit} style={styles.menuItem}>
            <Text style={styles.menuText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete}style={styles.menuItem}>
            <Text style={styles.menuText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 170,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 250,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  genre: {
    fontSize: 12,
    color: '#d3d3d3',
    marginTop: 2,
  },
  statusIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 12,
    padding: 4,
  },
  inlineMenu: {
    position: 'absolute',
    top: 40,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    zIndex: 10,
  },
  menuItem: {
    paddingVertical: 4,
  },
  menuText: {
    color: '#fff',
    fontSize: 14,
  },
  highlighted: {
    color: '#ff0',
    fontWeight: 'bold',
  },
});

export default BookCard;
