import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import HomeScreenSemesterButtonComponent from '../components/HomeScreenSemesterButtonComponent';
import DrawerButtonComponent from '../components/DrawerButtonComponent';
import {useTheme} from '@react-navigation/native';
import {windowDimensions} from '../Utils';

const HomeScreen = ({navigation}) => {
  const data = require('../assets/data.json');
  const {colors} = useTheme();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
        padding: windowDimensions.height * 0.015,
      }}>
      <DrawerButtonComponent navigation={navigation} />

      <ScrollView>
        <View style={styles.buttonContainer}>
          <HomeScreenSemesterButtonComponent
            navigation={navigation}
            data={data[0]}
          />
          <HomeScreenSemesterButtonComponent
            navigation={navigation}
            data={data[1]}
          />
        </View>
        <View style={styles.buttonContainer}>
          <HomeScreenSemesterButtonComponent
            navigation={navigation}
            data={data[2]}
          />
          <HomeScreenSemesterButtonComponent
            navigation={navigation}
            data={data[3]}
          />
        </View>
      </ScrollView>

      <Pressable onPress={() => navigation.navigate('About FSMK')}>
        <Text style={styles.bottomText}>Built by </Text>
        <View style={styles.bottomContainer}>
          <Image
            source={require('../assets/fsmkLogo.png')}
            style={styles.fsmkLogo}
          />
          <Text style={[styles.bottomText, styles.fsmkBold]}>FSMK</Text>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};
export default HomeScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: '2.5%',
  },
  bottomText: {
    alignSelf: 'center',
    color: '#1a77ff',
    fontSize: windowDimensions.height * 0.02,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  fsmkLogo: {
    width: windowDimensions.height * 0.035,
    height: windowDimensions.height * 0.035,
    marginRight: '1.5%',
  },
  fsmkBold: {
    fontWeight: 'bold',
    fontSize: windowDimensions.height * 0.04,
  },
});
