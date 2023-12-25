import {Pressable} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import {globalStyles} from '../GlobalStyles';

const DrawerButtonComponent = ({navigation}) => {
  return (
    <Pressable onPress={() => navigation.openDrawer()}>
      <MaterialCommunityIcons
        name="view-headline"
        color={globalStyles.navButtonColor}
        size={50}
      />
    </Pressable>
  );
};

DrawerButtonComponent.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default DrawerButtonComponent;
