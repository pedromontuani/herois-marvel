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
    borderColor: colors.white
  },
  avatarSelection: {
    fontSize: 26,
    color: colors.white,
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
    color: colors.white,
    borderBottomColor: colors.white,
    paddingBottom: 20,
    borderBottomWidth: 1
  },
  invalidTextInput: {
    borderBottomColor: colors.error
  },
  buttonsHolder: {
    flex: 0.2,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingTop: 30
  },
  textFullButton: {
    fontWeight: 'bold',
    color: colors.primary
  },
  textOutlineButton: {
    color: colors.white
  },
  socialIcon: {
    fontSize: 22
  }
});
