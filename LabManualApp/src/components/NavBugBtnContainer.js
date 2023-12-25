import {Pressable, View, StyleSheet} from 'react-native';
import React from 'react';
import {globalStyles} from '../GlobalStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';

const NavBugBtnContainer = ({navigation}) => {
  return (
    <View style={globalStyles.topContainer}>
      <Pressable onPress={() => navigation.goBack()} style={styles.navBtn}>
        <MaterialCommunityIcons
          name="keyboard-backspace"
          color={globalStyles.navButtonColor}
          size={30}
        />
      </Pressable>
      <Pressable onPress={() => console.log('Hello')}>
        <MaterialCommunityIcons
          name="alert-circle-outline"
          color={'#BF3131'}
          size={30}
        />
      </Pressable>
    </View>
  );
};
NavBugBtnContainer.propTypes = {
  navigation: PropTypes.object.isRequired,
};
export default NavBugBtnContainer;

const styles = StyleSheet.create({
  navBtn: {
    marginLeft: -9,
  },
});
