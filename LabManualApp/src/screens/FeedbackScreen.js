import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import DrawerButtonComponent from '../components/DrawerButtonComponent';

const FeedbackScreen = ({navigation}) => {
  return (
    <SafeAreaView>
      <DrawerButtonComponent/>
    </SafeAreaView>
  );
};

FeedbackScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default FeedbackScreen;

const styles = StyleSheet.create({});
