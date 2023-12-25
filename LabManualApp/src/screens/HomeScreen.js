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
import {globalStyles} from '../GlobalStyles';
import HomeScreenSemesterButtonComponent from '../components/HomeScreenSemesterButtonComponent';
import DrawerButtonComponent from '../components/DrawerButtonComponent';

const HomeScreen = ({navigation}) => {
  const data = require('../data.json');

  return (
    <SafeAreaView style={[globalStyles.mainContainer]}>
      <View style={globalStyles.topContainer}>
        <DrawerButtonComponent navigation={navigation} />
      </View>

      <ScrollView style={[globalStyles.scrollView]}>
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
            source={require('../assets/fsmkLogo.jpg')}
            style={styles.fsmkLogoBottom}
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
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: 10,
  },
  bottomText: {
    alignSelf: 'center',
    color: '#1673ff',
    fontSize: 17.5,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:5,
  },
  fsmkLogoBottom: {
    width: 35,
    height: 35,
    marginRight: 5,
  },
  fsmkBold: {
    fontWeight: 'bold',
    fontSize: 40,
  },
});
