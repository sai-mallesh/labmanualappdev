import {SafeAreaView, StyleSheet, Text, View, BackHandler} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {globalStyles} from '../GlobalStyles';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ProgramsListScreen from './ProgramsListScreen';
import WebViewComponent from '../components/WebViewComponent';
import {useFocusEffect} from '@react-navigation/native';
import NavBugBtnContainer from '../components/NavBugBtnContainer';

const Tab = createMaterialTopTabNavigator();

const CourseScreen = ({navigation, route}) => {
  const {courseData} = route.params;

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.goBack();
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [navigation]),
  );

  return (
    <SafeAreaView style={globalStyles.mainContainer}>
      <View style={globalStyles.container}>
        <NavBugBtnContainer navigation={navigation} />
        <View>
          <Text style={styles.courseDetails}>
            Course Code: {courseData.courseCode}
          </Text>
          <Text style={styles.courseDetails}>
            Course Name: {courseData.courseName}
          </Text>
        </View>
      </View>

      <Tab.Navigator
        initialRouteName="ProgramsList"
        /*screenOptions={{
          tabBarStyle: {
            backgroundColor: '#b8b6b5',
          },
          tabBarIndicatorStyle: {
            backgroundColor: '#754b2e',
          },
          tabBarLabelStyle:{
            fontWeight:'bold'
          },
          tabBarActiveTintColor: '#754b2e',
          tabBarInactiveTintColor: '#dad6d3',
        }}*/>
        <Tab.Screen
          name="Syllabus"
          component={WebViewComponent}
          initialParams={{
            data:
              'https://drive.google.com/viewerng/viewer?embedded=true&url=' +
              courseData.syllabus,
            message: 'Syllabus is not available',
          }}
        />
        <Tab.Screen
          name="ProgramsList"
          component={ProgramsListScreen}
          options={{title: 'Programs'}}
          initialParams={{programsList: courseData.programs}}
        />
        <Tab.Screen
          name="Helper Guide"
          component={WebViewComponent}
          initialParams={{
            data: courseData.resources,
            message: 'No resources available for this course.',
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};
CourseScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default CourseScreen;

const styles = StyleSheet.create({
  courseDetails: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#363636',
  },
});
