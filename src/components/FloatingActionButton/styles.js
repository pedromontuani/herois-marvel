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
    backgroundColor: colors.primary,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    zIndex: 50,
  },
  icon: {
    fontSize: 28,
    color: 'white',
  },
});
