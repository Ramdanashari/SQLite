import React, { useEffect } from 'react';
import AppNavigator from './navigation/AppNavigator';
import Orientation from 'react-native-orientation-locker';
import { createTable } from './databases/dbHelper';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    Orientation.unlockAllOrientations();
    SplashScreen.hide()

    // Inisialisasi database SQLite
    const initDB = async () => {
      try {
        await createTable();
        console.log('tabel berhasil dibuat');
      } catch (error) {
        console.error('error membuat tabel', error);
      }
    };

    initDB();

    return () => {
      Orientation.unlockAllOrientations();
    };
  }, []);

  return <AppNavigator />;
};

export default App;
