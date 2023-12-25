import {Pressable, StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {globalStyles} from '../GlobalStyles';

const ProgramsListScreen = ({navigation, route}) => {
  const {programsList} = route.params;
  return (
    <View style={[globalStyles.container, styles.container]}>
      <ScrollView style={globalStyles.scrollView}>
        {programsList.map((program, index) => {
          return (
            <View key={program.programNo} style={[styles.button, globalStyles.buttonColor]}>
              <Pressable
                onPress={() => navigation.navigate('Program', {data: program})}>
                <Text style={styles.buttonText}>
                  {program.programNo}. {program.programName}
                </Text>
              </Pressable>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

ProgramsListScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default ProgramsListScreen;

const styles = StyleSheet.create({
  button: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    height: 60,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
  },
  container: {backgroundColor: '#ffffff'},
});
