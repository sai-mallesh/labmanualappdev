import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  useColorScheme,
} from 'react-native';
import React, {useState} from 'react';
import {WebView} from 'react-native-webview';
import {globalStyles} from '../GlobalStyles';
import PropTypes from 'prop-types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const screenHeight = Dimensions.get('window').height;

const AccordionComponent = ({label, url}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === 'dark' ? '#000000' : '#ffffff';

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
            uri: url,
          }}
          style={[
            globalStyles.webView,
            {height: screenHeight * 0.5},
            {backgroundColor: backgroundColor},
          ]}
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
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    marginVertical: 5,
    backgroundColor: '#1673ff',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonText: {
    fontSize: 15,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
