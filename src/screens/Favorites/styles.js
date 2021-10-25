import { StyleSheet } from 'react-native';
import colors from '~/theme/colors';

export default StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: colors.primary
  },
  container: {
    flex: 1,
    backgroundColor: colors.lightGray
  },
  flatListContent: { padding: 20 }
});
