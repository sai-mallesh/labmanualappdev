import {SafeAreaView, StyleSheet, Text, View, BackHandler} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ProgramsListScreen from './ProgramsListScreen';
import WebViewComponent from '../components/WebViewComponent';
import {useFocusEffect, useTheme} from '@react-navigation/native';
import NavBugBtnContainer from '../components/NavBugBtnContainer';
import { windowDimensions } from '../Utils';

const Tab = createMaterialTopTabNavigator();

const CourseScreen = ({navigation, route}) => {
  const {courseData} = route.params;
  const {colors} = useTheme();

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
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
      <View style={{padding:windowDimensions.height * 0.015}}>
        <NavBugBtnContainer navigation={navigation} />
        <View>
          <Text style={[styles.courseDetails, {color: colors.text}]}>
            Course Code: {courseData.courseCode}
          </Text>
          <Text style={[styles.courseDetails, {color: colors.text}]}>
            Course Name: {courseData.courseName}
          </Text>
        </View>
      </View>

      <Tab.Navigator
        initialRouteName="ProgramsList"
        screenOptions={{
          tabBarStyle: {
            backgroundColor: colors.background,
          },
          tabBarIndicatorStyle: {
            backgroundColor: colors.tabActive,
          },
          tabBarLabelStyle: {
            fontSize: windowDimensions.height * 0.015,
            fontWeight: 'bold',
          },
          tabBarActiveTintColor: colors.tabActive,
          tabBarInactiveTintColor: colors.tabInactive,
        }}>
        <Tab.Screen
          name="Syllabus"
          component={WebViewComponent}
          initialParams={{
            data: courseData.syllabus,
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
    fontSize: windowDimensions.height * 0.02,
    fontWeight: 'bold',
  },
});
