import {
  StyleSheet,
  Text,
  SafeAreaView,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {globalStyles} from '../GlobalStyles';
import NavBugBtnContainer from '../components/NavBugBtnContainer';

const CourseListScreen = ({navigation, route}) => {
  const {data} = route.params;
  return (
    <SafeAreaView style={[globalStyles.mainContainer, globalStyles.container]}>
      <NavBugBtnContainer navigation={navigation} />
      <ScrollView style={[globalStyles.scrollView, styles.scrollView]}>
        {data.map((i, index) => {
          return (
            <View
              key={i.courseCode}
              style={[globalStyles.buttonColor, styles.button]}>
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
    padding: 20,
    marginVertical: 5,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  scrollView: {
    marginTop: 5,
  },
});
