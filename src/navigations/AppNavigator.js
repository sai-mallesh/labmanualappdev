import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import CourseListScreen from '../screens/CourseListScreen';
import CourseScreen from '../screens/CourseScreen';
import FeedbackScreen from '../screens/FeedbackScreen';
import ReportBug from '../screens/ReportBug';
import ProgramScreen from '../screens/ProgramScreen';
import AboutScreen from '../screens/AboutScreen';
import CustomDrawerComponent from '../components/CustomDrawerComponent';
import PropTypes from 'prop-types';

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

const StackNav = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CourseList" component={CourseListScreen} />
      <Stack.Screen name="Course" component={CourseScreen} />
      <Stack.Screen name="Program" component={ProgramScreen} />
    </Stack.Navigator>
  );
};

const AppNavigator = ({toggleThemeMode, isDarkThemeMode}) => {
  return (
    <Drawer.Navigator
      drawerContent={props => (
        <CustomDrawerComponent
          {...props}
          toggleThemeMode={toggleThemeMode}
          isDarkThemeMode={isDarkThemeMode}
        />
      )}
      screenOptions={{headerShown: false}}>
      <Drawer.Screen
        name="Home Nav"
        component={StackNav}
        options={{title: 'Home'}}
      />
      <Drawer.Screen name="About FSMK" component={AboutScreen} />
      <Drawer.Screen name="Feedback" component={FeedbackScreen} />
      <Drawer.Screen
        name="ReportBug"
        component={ReportBug}
        options={{title: 'Report a Bug'}}
      />
    </Drawer.Navigator>
  );
};

AppNavigator.propTypes = {
  toggleThemeMode: PropTypes.func.isRequired,
  isDarkThemeMode: PropTypes.bool.isRequired,
};

export default AppNavigator;
