import {Pressable, StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {useTheme} from '@react-navigation/native';
import { windowDimensions } from '../Utils';

const ProgramsListScreen = ({navigation, route}) => {
  const {programsList} = route.params;
  const {colors} = useTheme();
  return (
    <View
      style={{backgroundColor: colors.background, padding:windowDimensions.height * 0.0125}}>
      <ScrollView>
        {programsList.length > 0 &&
          programsList.map((program, index) => {
            return (
              <View
                key={program.programNo}
                style={[styles.button, {backgroundColor:colors.button}]}>
                <Pressable
                  onPress={() =>
                    navigation.navigate('Program', {data: program})
                  }>
                  <Text style={[styles.buttonText,{color:colors.buttonText}]}>
                    {program.programNo}. {program.programName}
                  </Text>
                </Pressable>
              </View>
            );
          })}
          {programsList.length === 0 && (
            <Text style={{color:colors.text,alignSelf:'center',justifyContent:'center',fontWeight:'bold',marginTop:'50%'}}>No programs available</Text>
          )}
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
    padding: windowDimensions.height * 0.01,
    marginVertical: '1.25%',
    minHeight:windowDimensions.height * 0.065,
    borderRadius: windowDimensions.height * 0.01,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: windowDimensions.height * 0.0175,
    fontWeight: 'bold',
  },
});
