import {StyleSheet, Text, Dimensions, Pressable} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {globalStyles} from '../GlobalStyles';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const HomeScreenSemesterButtonComponent = ({navigation, data}) => {
  return (
    <Pressable
      onPress={() => navigation.navigate('CourseList', {data: data.courses})}
      style={[styles.button, globalStyles.button, globalStyles.buttonColor]}>
      <Text style={[styles.buttonText, globalStyles.buttonText]}>
        {data.semester}
      </Text>
    </Pressable>
  );
};

HomeScreenSemesterButtonComponent.propTypes = {
  navigation: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default HomeScreenSemesterButtonComponent;

const styles = StyleSheet.create({
  button: {
    height: screenHeight * 0.3,
    width: screenWidth * 0.45,
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 35,
  },
});
