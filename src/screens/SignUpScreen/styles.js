import { StyleSheet, Dimensions } from 'react-native';
import variables from '../../theme/variables';
import colors from '../../theme/colors';

const height = Dimensions.get('window').height;

export default StyleSheet.create({
  viewport: {
    height: height,
    paddingHorizontal: variables.pagePadding,
    paddingVertical: variables.pagePadding
  },
  kbAvoindingView: {
    flex: 0.8
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignSelf: 'stretch'
  },
  avatarHolder: {
    flex: 0.3,
    justifyContent: 'flex-start',
    alignSelf: 'center'
  },
  avatar: {
    height: 180,
    width: 180,
    borderRadius: 90,
    borderWidth: 6,
    borderColor: '#FFF'
  },
  avatarSelection: {
    fontSize: 26,
    color: '#FFF',
    alignSelf: 'flex-end',
    marginTop: -20
  },
  inputsHolder: {
    flex: 0.5,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  inputOuter: {
    paddingVertical: 10
  },
  textInput: {
    width: '100%',
    color: '#FFFFFF'
  },
  buttonsHolder: {
    flex: 0.2,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingTop: 20
  },
  textFullButton: {
    fontWeight: 'bold',
    color: colors.primary
  },
  textOutlineButton: {
    color: '#FFFFFF'
  },
  socialIcon: {
    fontSize: 22
  }
});
