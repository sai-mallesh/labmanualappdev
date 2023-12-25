import {ToastAndroid} from 'react-native';

export const ToastMessageComponent = message => {
  return ToastAndroid.showWithGravity(
    message,
    ToastAndroid.LONG,
    ToastAndroid.CENTER,
  );
};
