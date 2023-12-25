import {
  StyleSheet,
  Text,
  SafeAreaView,
  Pressable,
  ScrollView,
  View,
  Dimensions,
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import NavBugBtnContainer from '../components/NavBugBtnContainer';

import {useTheme} from '@react-navigation/native';
import { windowDimensions } from '../Utils';

const {height} = Dimensions.get('window');

const CourseListScreen = ({navigation, route}) => {
  const {data} = route.params;
  const { colors } = useTheme();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
        padding: height * 0.015,
      }}>
      <NavBugBtnContainer navigation={navigation} />
      <ScrollView>
        {data.length > 0 &&
          data.map((i, index) => {
            return (
              <View
                key={i.courseCode}
                style={[styles.button, {backgroundColor:colors.button}]}>
                <Pressable
                  onPress={() =>
                    navigation.navigate('Course', {courseData: data[index]})
                  }>
                  <Text style={styles.buttonText}>
                    {i.courseCode}
                    {'\n'}
                    {i.courseName}
                  </Text>
                </Pressable>
              </View>
            );
          })}
      </ScrollView>
    </SafeAreaView>
  );
};

CourseListScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object,
};

export default CourseListScreen;

const styles = StyleSheet.create({
  button: {
    padding: windowDimensions.height * 0.025,
    marginVertical: '1.25%',
    borderRadius: windowDimensions.height * 0.015,
  },
  buttonText: {
    fontSize: windowDimensions.height * 0.02,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
