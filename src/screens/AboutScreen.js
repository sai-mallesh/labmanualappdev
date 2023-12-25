import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import DrawerButtonComponent from '../components/DrawerButtonComponent';
import {useTheme} from '@react-navigation/native';
import {windowDimensions} from '../Utils';

const AboutScreen = ({navigation}) => {
  const {colors} = useTheme();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
        padding: windowDimensions.height * 0.015,
      }}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <DrawerButtonComponent navigation={navigation} />
          <Text style={styles.headerText}>About FSMK</Text>
        </View>
        <Text
          style={{
            fontSize: windowDimensions.height * 0.025,
            color: colors.text,
            marginBottom: '5%',
          }}>
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
    color: '#1a77ff',
  },
});
