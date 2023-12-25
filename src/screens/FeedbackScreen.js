import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {windowDimensions} from '../Utils';
import WebView from 'react-native-webview';

const FeedbackScreen = ({navigation}) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#ffffff',
        padding: windowDimensions.height * 0.015,
      }}>
      <View style={styles.headerContainer}>
        <View style={{flexDirection: 'row'}}>
          <Pressable
            onPress={() => navigation.openDrawer()}
            style={{marginLeft: -windowDimensions.height * 0.0075}}>
            <MaterialCommunityIcons
              name="view-headline"
              color={'#000000'}
              size={windowDimensions.height * 0.05}
            />
          </Pressable>
        </View>
        <Text style={styles.headerText}>Feedback</Text>
      </View>
      <WebView
        source={{
          uri: 'https://commune.fsmk.org/survey/start/33ca7362-9258-477c-9a27-58f3085d02e4',
        }}
        startInLoadingState={true}
      />
    </SafeAreaView>
  );
};

FeedbackScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default FeedbackScreen;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '2.5%',
  },
  headerText: {
    textAlign: 'center',
    fontSize: windowDimensions.height * 0.04,
    width: '80%',
    fontWeight: 'bold',
    color: '#000000',
  },
});
