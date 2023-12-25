import {StyleSheet, Text, View, SafeAreaView, BackHandler} from 'react-native';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import WebViewComponent from '../components/WebViewComponent';
import {useFocusEffect, useTheme} from '@react-navigation/native';
import NavBugBtnContainer from '../components/NavBugBtnContainer';
import { windowDimensions } from '../Utils';

const Tab = createMaterialTopTabNavigator();

const ProgramScreen = ({navigation, route}) => {
  const {data} = route.params;
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

  const [showCompletePrompt, setShowCompletePrompt] = useState(false);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
      <View style={{padding:windowDimensions.height * 0.015}}>
        <NavBugBtnContainer navigation={navigation} />
        <View>
          <Text style={[styles.text, {color: colors.text}]}>
            Program No. {data.programNo}
          </Text>
          <Text style={[styles.text, {color: colors.text}]}>
            {data.programPrompt.length < 150 && data.programPrompt}
            {data.programPrompt.length > 150 && !showCompletePrompt && (
              <>
                {data.programPrompt.slice(0, 150)}...
                <Text
                  style={styles.viewMore}
                  onPress={() => setShowCompletePrompt(true)}>
                  {'\t'}View More
                </Text>
              </>
            )}
            {data.programPrompt.length > 150 && showCompletePrompt && (
              <>
                {data.programPrompt}
                <Text
                  style={styles.viewMore}
                  onPress={() => setShowCompletePrompt(false)}>
                  {'\t'}Show Less
                </Text>
              </>
            )}
          </Text>
        </View>
      </View>
      <Tab.Navigator
        initialRouteName="Code"
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
          name="Code"
          component={WebViewComponent}
          initialParams={{data: data.code, message: 'Code is not available.'}}
        />
        <Tab.Screen
          name="Output"
          component={WebViewComponent}
          initialParams={{
            data: data.output,
            message: 'Output is not available.',
          }}
        />
        <Tab.Screen
          name="Resources"
          component={WebViewComponent}
          initialParams={{
            data: data.resource,
            message: 'No resources available.',
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

ProgramScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object,
};

export default ProgramScreen;

const styles = StyleSheet.create({
  text: {
    fontSize: windowDimensions.height * 0.0175,
    fontWeight: 'bold',
  },
  viewMore: {
    color: '#1673ff',
    fontWeight: 'bold',
  },
});
