import {Pressable, View} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import {useTheme} from '@react-navigation/native';
import {windowDimensions} from '../Utils';

const DrawerButtonComponent = ({navigation}) => {
  const {colors} = useTheme();
  return (
    <View style={{flexDirection:'row'}}>
      <Pressable
        onPress={() => navigation.openDrawer()}
        style={{marginLeft:-windowDimensions.height * 0.0075}}>
        <MaterialCommunityIcons
          name="view-headline"
          color={colors.text}
          size={windowDimensions.height * 0.05}
        />
      </Pressable>
    </View>
  );
};

DrawerButtonComponent.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default DrawerButtonComponent;
