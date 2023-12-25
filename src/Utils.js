import {ToastAndroid, Dimensions, StyleSheet} from 'react-native';

export const ToastMessageComponent = message => {
  return ToastAndroid.showWithGravity(
    message,
    ToastAndroid.LONG,
    ToastAndroid.CENTER,
  );
};

export const windowDimensions = Dimensions.get('window');

export const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: '2.5%',
  },
});