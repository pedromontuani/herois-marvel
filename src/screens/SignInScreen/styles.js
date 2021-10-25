import { StyleSheet, Dimensions } from 'react-native';
import variables from '~/theme/variables';
import colors from '~/theme/colors';

const deviceHeigth = Dimensions.get('window').height;

export default StyleSheet.create({
  viewport: {
    height: deviceHeigth
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: variables.pagePadding
  },
  logoHolder: {
    flex: 0.3,
    paddingTop: 20
  },
  firebaseLogo: {
    height: '60%'
  },
  inputsHolder: {
    flex: 0.3,
    alignSelf: 'stretch',
    flexDirection: 'column',
    justifyContent: 'space-around'
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
    flex: 0.4,
    flexDirection: 'column',
    alignSelf: 'stretch',
    justifyContent: 'center'
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
