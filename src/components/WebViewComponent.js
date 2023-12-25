import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Appearance,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import {WebView} from 'react-native-webview';
import PropTypes from 'prop-types';
import AccordionComponent from './AccordionComponent';
import {useTheme} from '@react-navigation/native';
import {windowDimensions} from '../Utils';

const WebViewComponent = ({route}) => {
  const {data, message} = route.params;
  const colorScheme = Appearance.getColorScheme();
  const {colors} = useTheme();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
      }}>
      {data !== undefined && typeof data === 'string' && (
        <WebView
          source={{
            uri: data.endsWith('.pdf')
              ? 'https://drive.google.com/viewerng/viewer?embedded=true&url=' +
                data
              : data,
          }}
          startInLoadingState={data.endsWith('.pdf')}
          minimumFontSize={
            !data.includes('gitlab') ? 1 : windowDimensions.height * 0.035
          }
          nestedScrollEnabled={true}
          style={{
            flex: 1,
            backgroundColor: colorScheme === 'dark' ? '#000000' : '#fff',
            margin:
              data.endsWith('.pdf') || !data.includes('gitlab') ? 0 : '2.5%',
          }}
        />
      )}
      {data !== undefined && typeof data === 'object' && (
        <ScrollView
          style={{
            margin: windowDimensions.height * 0.005,
            backgroundColor: colorScheme === 'dark' ? '#000000' : '#fff',
          }}>
          {data.map(item => (
            <AccordionComponent
              key={item.label}
              label={item.label}
              url={item.url}
            />
          ))}
        </ScrollView>
      )}
      {data === undefined && (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            backgroundColor: colors.background,
          }}>
          <Text style={[styles.text, {color: colors.text}]}>{message}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

WebViewComponent.propTypes = {
  route: PropTypes.object.isRequired,
};

export default WebViewComponent;

const styles = StyleSheet.create({
  messageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});
