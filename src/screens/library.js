import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions } from 'react-native';

const categories = [
  { id: '1', name: 'ROMANCE', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVLlAwKtLpTgk9Elg9o6GBQhcK918annMkjA&s' },
  { id: '2', name: 'ADULT', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVdTNH3jokhS8wxqzsicQGaZnZQHX8kDaeeQ&s' },
  { id: '3', name: 'COMEDY', icon: 'https://cdn-icons-png.flaticon.com/512/3658/3658528.png' },
  { id: '4', name: 'TEENLIT', icon: 'https://e7.pngegg.com/pngimages/194/1020/png-clipart-emoji-broken-heart-emoticon-sticker-emoji-emoji-broken-heart.png' },
  { id: '5', name: 'ACTION', icon: 'https://w7.pngwing.com/pngs/415/908/png-transparent-two-brown-and0-gray-swords-icon-sword-weapon-icon-swords-game-angle-samurai-sword-thumbnail.png' },
  { id: '6', name: 'FANTASY', icon: 'https://cdn-icons-png.freepik.com/512/2368/2368498.png' },
  { id: '7', name: 'ISLAMI', icon: 'https://c8.alamy.com/comp/2MP0NFN/crescent-moon-and-star-silhouette-icon-islam-editable-vector-2MP0NFN.jpg' },
  { id: '8', name: 'HORROR', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTz55e_1g0u_03ujUcjP7PJ9hZtdSol_MKutO5AZsWjN5ieHm2rZW1O2OVvYzpiBAsLl4&usqp=CAU' },
  { id: '9', name: 'INSPIRATIONAL', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbN13sr_2fJAHlbKK07e7KGpfJ36HUnUhKkvwhdJ1KSPcfwuFP7q1YR_mNTwY1FxW_d9I&usqp=CAU' },
  { id: '10', name: 'MYSTERY', icon: 'https://png.pngtree.com/png-vector/20240710/ourlarge/pngtree-the-logo-of-an-occult-mystery-school-vector-png-image_7047416.png' },
  { id: '11', name: 'HISTORICAL', icon:'https://w7.pngwing.com/pngs/761/659/png-transparent-computer-icons-history-history-angle-text-trademark-thumbnail.png' },
  { id: '12', name: 'THRILLER', icon: 'https://media.istockphoto.com/id/1304720093/id/vektor/ikon-glyph-mode-gelap-film-thriller.jpg?s=612x612&w=0&k=20&c=YvRJp_7WPJmv08XlJ7_MNLAYPklBE2yq0MdBMCqDsXI=' },
];

const LibraryScreen = () => {
  const numColumns = 2;
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.icon }} style={styles.icon} />
      <Text style={styles.categoryText}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>     
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 16,
  },
  list: {
    paddingTop: 20,
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 8,
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    justifyContent: 'space-around',
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});

export default LibraryScreen;
