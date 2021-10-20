import { StyleSheet } from 'react-native';
import colors from '~/theme/colors';

export default StyleSheet.create({
  container: {
    height: 300,
    width: '100%',
    marginBottom: 20,
    backgroundColor: colors.white,
    elevation: 2,
    borderRadius: 10,
  },
  image: { flex: 0.6, borderTopRightRadius: 10, borderTopLeftRadius: 10 },
  contentOuter: {
    flex: 0.4,
    backgroundColor: 'white',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  contentInner: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', paddingBottom: 5 },
  description: {},
});
