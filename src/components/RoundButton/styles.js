import { StyleSheet, Dimensions } from 'react-native';

const deviceHeigth = Dimensions.get('window').height - 20;

export default StyleSheet.create({
  buttonHolder: {
    width: '100%',
    height: deviceHeigth * 0.1,
  },
  buttonOuter: {
    borderRadius: deviceHeigth * 0.1 * 0.9,
    borderWidth: 2,
    borderStyle: 'solid',
    height: '90%',
  },
  buttonInner: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  buttonInnerContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
