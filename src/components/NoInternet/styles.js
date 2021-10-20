import { StyleSheet } from 'react-native';
import colors from '~/theme/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: { width: 450, height: 450 },
  text: {
    flex: 0.2,
    fontSize: 16,
    color: colors.darkGray,
    textAlign: 'center',
  },
});
