import {StyleSheet, Text, View, SafeAreaView,BackHandler } from 'react-native';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {globalStyles} from '../GlobalStyles';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import WebViewComponent from '../components/WebViewComponent';
import { useFocusEffect } from '@react-navigation/native';
import NavBugBtnContainer from '../components/NavBugBtnContainer';

const Tab = createMaterialTopTabNavigator();

const ProgramScreen = ({navigation, route}) => {
  const {data} = route.params;

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
    }, [navigation])
  );

  const [showCompletePrompt, setShowCompletePrompt] = useState(false);

  return (
    <SafeAreaView style={globalStyles.mainContainer}>
      <View style={globalStyles.container}>
      <NavBugBtnContainer navigation={navigation} />
        <View>
          <Text style={styles.text}>Program No. {data.programNo}</Text>
          <Text style={styles.text}>
            {data.programPrompt.length > 150 && !showCompletePrompt ? (
              <>
                {data.programPrompt.slice(0, 150)}...
                <Text
                  style={styles.viewMore}
                  onPress={() => setShowCompletePrompt(true)}>
                  {'\t'}View More
                </Text>
              </>
            ) : (
              data.programPrompt
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
    fontSize: 15,
    color: '#363636',
    fontWeight:'bold',
  },
  viewMore: {
    color: '#1673ff',
    fontWeight:'bold',
  },
});
