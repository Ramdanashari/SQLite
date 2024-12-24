import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProfileScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>cabaca</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons name="settings-outline" size={24} color="#333" style={styles.settingsIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.profileSection}>
        <Image
          source={{ uri: 'https://asset.kompas.com/crops/D2l1elMnCA2bhzsnJ2dZSzDvksI=/99x0:1044x630/1200x800/data/photo/2020/02/10/5e40a1bd00128.jpg' }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>Nancy Momoland</Text>
        <Text style={styles.username}>Nancymmlnd12@gmail.com</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>100</Text>
          <Text style={styles.statLabel}>Mengikuti</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>100</Text>
          <Text style={styles.statLabel}>Pengikut</Text>
        </View>
        <TouchableOpacity style={styles.copyLinkButton}>
          <Text style={styles.copyLinkText}>Copy Link</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.description}>Tuliskan deskripsi dirimu di setting profile</Text>
      <TouchableOpacity>
        <Text style={styles.websiteLink}>https://iniblogku.co.id</Text>
      </TouchableOpacity>

      <View style={styles.kerangContainer}>
        <View style={styles.kerangBox}>
          <Text style={styles.kerangLabel}>Kerang Reguler</Text>
          <Text style={styles.kerangAmount}>400</Text>
          <TouchableOpacity style={styles.topUpButton}>
            <Text style={styles.topUpText}>Top Up</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.kerangBox}>
          <Text style={styles.kerangLabel}>Kerang Bonus</Text>
          <Text style={styles.kerangAmount}>60</Text>
          <TouchableOpacity style={styles.misiKerangButton}>
            <Text style={styles.misiKerangText}>Misi Kerang</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.menuSection}>
        <Text style={styles.menuItem}>Level Baca</Text>
        <Text style={styles.menuItem}>Ajak Teman</Text>
        <Text style={styles.menuItem}>Peti Harta Karun</Text>
        <Text style={styles.menuItem}>Buku</Text>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Ionicons name="close" size={24} color="#333" style={styles.closeIcon} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Pengaturan Akun</Text>
            <View style={styles.menuOption}>
              <Ionicons name="person-outline" size={20} color="#333" />
              <Text style={styles.menuText}>Informasi Personal</Text>
            </View>
            <View style={styles.menuOption}>
              <Ionicons name="at-outline" size={20} color="#333" />
              <Text style={styles.menuText}>Ubah Username</Text>
            </View>
            <View style={styles.menuOption}>
              <Ionicons name="mail-outline" size={20} color="#333" />
              <Text style={styles.menuText}>Ubah Email</Text>
            </View>
            <View style={styles.menuOption}>
              <Ionicons name="lock-closed-outline" size={20} color="#333" />
              <Text style={styles.menuText}>Ubah Password</Text>
            </View>
            <View style={styles.menuOption}>
              <Ionicons name="link-outline" size={20} color="#333" />
              <Text style={styles.menuText}>Tautkan Akun</Text>
            </View>
            <View style={styles.menuOption}>
              <Ionicons name="power-outline" size={20} color="#FF3B30" />
              <Text style={[styles.menuText, { color: '#FF3B30' }]}>Keluar</Text>
            </View>
            <Text style={styles.versionText}>Versi 3.2.5</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#33a67b',
  },
  settingsIcon: {
    padding: 8,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  username: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  copyLinkButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
  },
  copyLinkText: {
    fontSize: 14,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginVertical: 8,
  },
  websiteLink: {
    fontSize: 14,
    color: '#1e90ff',
    textAlign: 'center',
    marginBottom: 16,
  },
  kerangContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  kerangBox: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginHorizontal: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  kerangLabel: {
    fontSize: 16,
    color: '#333',
  },
  kerangAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#33a67b',
    marginVertical: 8,
  },
  topUpButton: {
    backgroundColor: '#33a67b',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  topUpText: {
    color: '#fff',
    fontSize: 14,
  },
  misiKerangButton: {
    backgroundColor: '#f39c12',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  misiKerangText: {
    color: '#fff',
    fontSize: 14,
  },
  menuSection: {
    marginTop: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
  },
  menuItem: {
    fontSize: 16,
    color: '#333',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  closeIcon: {
    alignSelf: 'flex-end',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  menuText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  versionText: {
    marginTop: 20,
    fontSize: 12,
    color: '#999',
  },
});

export default ProfileScreen;
