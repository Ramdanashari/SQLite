import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductDetailScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('DETAIL');

  useEffect(() => {
    checkIfFavorite();
  }, []);

  const checkIfFavorite = async () => {
    try {
      const favorites = await AsyncStorage.getItem('favorites');
      if (favorites) {
        const favoritesArray = JSON.parse(favorites);
        const isItemFavorite = favoritesArray.some(fav => fav.id === item.id);
        setIsFavorite(isItemFavorite);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleFavorite = async () => {
    try {
      const favorites = await AsyncStorage.getItem('favorites');
      let favoritesArray = favorites ? JSON.parse(favorites) : [];

      if (isFavorite) {
        favoritesArray = favoritesArray.filter(fav => fav.id !== item.id);
      } else {
        favoritesArray.push(item);
      }

      await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
      setIsFavorite(!isFavorite);

      Alert.alert(
        isFavorite ? "hapus dari Favorites" : "Added to Favorites",
        `${item.title} has been ${isFavorite ? "removed from" : "added to"} your favorites.`
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToLibrary = () => {
  };
    
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.backgroundImage} blurRadius={10} />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleFavorite}>
            <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={28} color="red" />
          </TouchableOpacity>
        </View>
        <View style={styles.imageFrame}>
          <Image source={{ uri: item.image }} style={styles.productImage} resizeMode="cover" />
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.author}>by {item.director}</Text>

        <View style={styles.metaInfo}>
          <View style={styles.iconText}>
            <Ionicons name="eye" size={20} color="#666" />
            <Text style={styles.metaText}>{item.readCount} dibaca</Text>
          </View>
          <View style={styles.iconText}>
            <Ionicons name="time" size={20} color="#666" />
            <Text style={styles.metaText}>{item.status}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.actionButton} onPress={handleAddToLibrary}>
          <Text style={styles.actionButtonText}>Mulai Baca</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => setActiveTab('BAB')} style={[styles.tab, activeTab === 'BAB' && styles.activeTab]}>
          <Text style={[styles.tabText, activeTab === 'BAB' && styles.activeTabText]}>BAB</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('DETAIL')} style={[styles.tab, activeTab === 'DETAIL' && styles.activeTab]}>
          <Text style={[styles.tabText, activeTab === 'DETAIL' && styles.activeTabText]}>DETAIL</Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'BAB' ? (
        <View style={styles.tabContent}>
          <Text style={styles.sectionTitle}>Blurb</Text>
          <Text style={styles.description}>{item.blurb}</Text>
        </View>
      ) : (
        <View style={styles.tabContent}>
          <Text style={styles.sectionTitle}>Book Details</Text>
          <Text style={styles.description}>Rating: {item.rating}</Text>
          <Text style={styles.description}>Genre: {item.genre}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.description}>Release: {item.releaseYear}</Text>
        </View>
      )}
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingBottom: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 16,
    position: 'relative',
    height: 300,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
  },
  backButton: {
    padding: 4,
  },
  imageFrame: {
    width: 160, 
    height: 230,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 130,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  detailsContainer: {
    padding: 16,
    alignItems: 'center',
    marginTop:35
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 4,
  },
  author: {
    fontSize: 16,
    color: '#666',
    marginVertical: 4,
    textAlign: 'center',
  },
  schedule: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  metaInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  iconText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  metaText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 4,
  },
  actionButton: {
    backgroundColor: '#00C851',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    width: '80%',
  },
  actionButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#00C851',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#00C851',
  },
  tabContent: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    textAlign: 'left',
  },
});

export default ProductDetailScreen;
