import { StyleSheet } from 'react-native';
import colors from '~/theme/colors';

export default StyleSheet.create({
  container: {
    flex: 1
  },
  safeAreaView: {
    backgroundColor: colors.primary,
    zIndex: 100
  },
  flatListContent: { padding: 20 }
});
