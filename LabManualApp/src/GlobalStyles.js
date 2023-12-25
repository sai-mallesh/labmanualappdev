import {StyleSheet} from 'react-native';

export const globalStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    height: '100%',
  },
  webView: {
    flex: 1,
  },
  container: {
    padding: 12.5,
  },
  topContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginVertical:5,
    paddingLeft:5,
  },
  navButtonColor: '#151515',
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
  },
  buttonColor: {
    backgroundColor: '#1673ff',
  },
  buttonText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffffff',
  },
  textInput: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#363636',
    padding: 10,
    color:'#151515',
  },
  textColor: {
    color: '#151515',
  },
});
