import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './src/navigations/AppNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useColorScheme} from 'react-native';
import {darkTheme, lightTheme} from './src/assets/theme';

const App = () => {
  const scheme = useColorScheme();
  const [isDarkThemeMode, setIsDarkThemeMode] = useState(scheme === 'dark');
  const fetchData = async () => {
    const isDarkTheme = await AsyncStorage.getItem('darkTheme');
    if (isDarkTheme !== null) {
      setIsDarkThemeMode(isDarkTheme === 'true');
    } else {
      setIsDarkThemeMode(scheme === 'dark');
    }
  };

  const toggleThemeMode = async () => {
    setIsDarkThemeMode(!isDarkThemeMode);
    await AsyncStorage.setItem('darkTheme', JSON.stringify(!isDarkThemeMode));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <NavigationContainer theme={isDarkThemeMode ? darkTheme : lightTheme}>
      <AppNavigator
        toggleThemeMode={toggleThemeMode}
        isDarkThemeMode={isDarkThemeMode}
      />
    </NavigationContainer>
  );
};

export default App;
