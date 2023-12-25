import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Appearance,
} from 'react-native';
import React, {useState} from 'react';
import {WebView} from 'react-native-webview';
import PropTypes from 'prop-types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {windowDimensions} from '../Utils';

const AccordionComponent = ({label, url}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const colorScheme = Appearance.getColorScheme();

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsExpanded(!isExpanded)}
        style={styles.button}>
        <Text style={styles.buttonText}>{label}</Text>
        <MaterialCommunityIcons
          name={isExpanded ? 'chevron-up-circle' : 'chevron-down-circle'}
          color={'#ffffff'}
          size={20}
        />
      </TouchableOpacity>
      {isExpanded && (
        <WebView
          source={{
            uri: url.endsWith('.pdf')
              ? 'https://drive.google.com/viewerng/viewer?embedded=true&url=' +
                url
              : url,
          }}
          minimumFontSize={windowDimensions.height * 0.035}
          nestedScrollEnabled={true}
          startInLoadingState={url.endsWith('.pdf')}
          style={{
            height: windowDimensions.height * 0.5,
            margin: '2.5%',
            backgroundColor: colorScheme === 'dark' ? '#000000' : '#fff',
          }}
        />
      )}
    </>
  );
};

AccordionComponent.propTypes = {
  label: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default AccordionComponent;

const styles = StyleSheet.create({
  button: {
    padding: windowDimensions.height * 0.01,
    borderRadius: windowDimensions.height * 0.01,
    margin: '1.25%',
    backgroundColor: '#1673ff',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonText: {
    fontSize: windowDimensions.height * 0.0175,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
