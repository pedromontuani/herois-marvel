import { StyleSheet } from 'react-native';
import colors from '~/theme/colors';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderRadius: 30,
    height: 60,
    width: 60,
    backgroundColor: colors.secondary,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    zIndex: 50
  },
  icon: {
    fontSize: 28,
    color: colors.white
  }
});
