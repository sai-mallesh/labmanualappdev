import {Pressable, StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Switch} from 'react-native-gesture-handler';
import {useTheme} from '@react-navigation/native';
import PropTypes from 'prop-types';

const CustomDrawerComponent = props => {
  const {colors} = useTheme();
  const toggleTheme = async () => {
    props.toggleThemeMode();
  };
  return (
    <View style={{flex: 1, backgroundColor: colors.drawer}}>
      <DrawerContentScrollView {...props}>
        <DrawerItem
          icon={({size}) => (
            <MaterialCommunityIcons
              name="home-outline"
              color={colors.text}
              size={size}
            />
          )}
          label="Home"
          labelStyle={{color: colors.text, fontWeight: 'bold'}}
          onPress={() => {
            props.navigation.navigate('Home');
          }}
        />
        <DrawerItem
          icon={({size}) => (
            <Image
              source={
                colors.text === '#ffffff'
                  ? require('../assets/fsmkLogoGrey.png')
                  : require('../assets/fsmkLogoBW.png')
              }
              style={{width: size, height: size}}
            />
          )}
          label="About FSMK"
          labelStyle={{color: colors.text, fontWeight: 'bold'}}
          onPress={() => {
            props.navigation.navigate('About FSMK');
          }}
        />
        <DrawerItem
          icon={({size}) => (
            <MaterialCommunityIcons
              name="transcribe"
              color={colors.text}
              size={size}
            />
          )}
          label="Feedback"
          labelStyle={{color: colors.text, fontWeight: 'bold'}}
          onPress={() => {
            props.navigation.navigate('Feedback');
          }}
        />
        <DrawerItem
          icon={({size}) => (
            <MaterialCommunityIcons
              name="alert-circle-outline"
              color={'#BB2205'}
              size={size}
            />
          )}
          label="Report a Bug"
          labelStyle={{color: '#BB2205', fontWeight:'bold'}}
          onPress={() => {
            props.navigation.navigate('ReportBug');
          }}
        />

        <Pressable
          onPress={() => {
            toggleTheme();
          }}>
          <View style={styles.preference}>
            <Text style={{color: colors.text, fontWeight:'bold'}}>Dark Theme</Text>
            <View pointerEvents="none">
              <Switch
                trackColor={{false: '#767577', true: '#767577'}}
                thumbColor={props.isDarkThemeMode ? '#ffffff' : '#363636'}
                value={props.isDarkThemeMode}
              />
            </View>
          </View>
        </Pressable>
      </DrawerContentScrollView>
    </View>
  );
};

CustomDrawerComponent.propTypes = {
  toggleThemeMode: PropTypes.func.isRequired,
  isDarkThemeMode: PropTypes.bool.isRequired,
};

export default CustomDrawerComponent;

const styles = StyleSheet.create({
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 17.5,
  },
});
