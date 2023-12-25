import {Pressable, View} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import {useTheme} from '@react-navigation/native';
import { windowDimensions } from '../Utils';

const NavBugBtnContainer = ({navigation}) => {
  const {colors} = useTheme();
  return (
    <View style={{flexDirection:'row',justifyContent:'space-between', marginBottom:'1.25%'}}>
      <Pressable onPress={() => navigation.goBack()}
      style={{marginLeft:-windowDimensions.height * 0.0025}}>
        <MaterialCommunityIcons
          name="keyboard-backspace"
          color={colors.text}
          size={windowDimensions.height * 0.035}
        />
      </Pressable>
      <Pressable onPress={() => navigation.navigate('ReportBug',{fromScreen:true})}>
        <MaterialCommunityIcons
          name="alert-circle-outline"
          color={'#BF3131'}
          size={windowDimensions.height * 0.035}
        />
      </Pressable>
    </View>
  );
};
NavBugBtnContainer.propTypes = {
  navigation: PropTypes.object.isRequired,
};
export default NavBugBtnContainer;
