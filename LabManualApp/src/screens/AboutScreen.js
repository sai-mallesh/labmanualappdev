import {
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
import DrawerButtonComponent from '../components/DrawerButtonComponent';

const AboutScreen = ({navigation}) => {
  return (
    <SafeAreaView style={[globalStyles.mainContainer]}>
      <View style={globalStyles.topContainer}>
        <DrawerButtonComponent navigation={navigation} />
        <View style={{flexDirection:'row',alignItems:'center'}}>
          <Text style={styles.aboutHeading}>About FSMK</Text>
          <Image
            source={require('../assets/fsmkLogo.jpg')}
            style={styles.fsmkLogo}
          />
        </View>
        <Text></Text>
      </View>

      <ScrollView style={globalStyles.scrollView}>
        <Text style={styles.about}>
          Free Software Movement Karnataka is a registered not-for-profit
          organization. Our primary objective is to create and spread awareness
          of Free Software technologies in different strata of society. We are
          driven by volunteers, who by day are software engineers, students,
          academicians, or government officials, and by night are Free Software
          evangelists.{'\n\n'}
          We work closely with college students and encourage them to use, and
          help develop, Free Software. To make this student interaction, we set
          up college-level units called GNU/Linux User Groups (GLUGs). These
          GLUGs organise various technical sessions and events.{'\n\n'}
          But what is Free Software? Free Software is software that respects a
          user's freedoms. In brief, it means that all users have the freedom to
          run, copy, distribute, study, change, and improve the software as they
          see fit. Think Free as in Free Speech, not Free Biryani.{'\n\n'}
          The opposite of Free Software is what is called Proprietary Software.
          Proprietary Software do not come with the same freedoms granted to the
          user by the developers of Free Software. Instead of the user
          controlling the software, often the software ends up controlling the
          user, especially since there is no way for the user to even verify
          what the software does. Proprietary Software is thus an instrument of
          unjust power, weilded by its developers.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

AboutScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default AboutScreen;

const styles = StyleSheet.create({
  aboutHeading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1673ff',
    marginRight:5,
  },
  about: {
    marginTop: 20,
    fontSize: 20,
    color: '#151515',
    marginHorizontal: 10,
  },
  fsmkLogo: {
    width: 30,
    height: 30,
  },
});
