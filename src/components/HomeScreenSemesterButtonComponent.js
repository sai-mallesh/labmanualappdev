import {StyleSheet, Text, Pressable} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {windowDimensions} from '../Utils';
import {useTheme} from '@react-navigation/native';

const HomeScreenSemesterButtonComponent = ({navigation, data}) => {
  const {colors} = useTheme();
  return (
    <Pressable
      onPress={() => navigation.navigate('CourseList', {data: data.courses})}
      style={[styles.button, {backgroundColor: colors.button}]}>
      <Text style={[styles.buttonText, {color: colors.buttonText}]}>
        {data.semester.split('Semester').join('\nSemester')}
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
    height: windowDimensions.height * 0.3,
    width: windowDimensions.width * 0.45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: windowDimensions.height * 0.04,
  },
});
