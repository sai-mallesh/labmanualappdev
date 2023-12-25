import {StyleSheet, Text, View, ScrollView, useColorScheme} from 'react-native';
import React from 'react';
import {WebView} from 'react-native-webview';
import {globalStyles} from '../GlobalStyles';
import PropTypes from 'prop-types';
import AccordionComponent from './AccordionComponent';

const WebViewComponent = ({route}) => {
  const {data, message} = route.params;
  const colorScheme = useColorScheme();

  const backgroundColor = colorScheme === 'dark' ? '#000000' : '#ffffff';

  return (
    <>
      {data !== undefined && typeof data === 'string' && (
        <WebView
          source={{
            uri: data,
          }}
          style={[globalStyles.webView, {backgroundColor: backgroundColor}]}
        />
      )}
      {data !== undefined && typeof data === 'object' && (
        <ScrollView style={styles.scrollView}>
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
        <View style={styles.messageContainer}>
          <Text style={styles.text}>{message}</Text>
        </View>
      )}
    </>
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
  scrollView: {
    marginVertical: 5,
  },
});
