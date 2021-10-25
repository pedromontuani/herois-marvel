import { StyleSheet } from 'react-native';
import colors from '~/theme/colors';

export default StyleSheet.create({
  container: {
    height: 280,
    width: '100%',
    marginBottom: 20,
    backgroundColor: colors.white,
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    borderRadius: 10
  },
  image: {
    flex: 0.7,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10
  },
  contentOuter: {
    flex: 0.3,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10
  },
  contentInner: { flex: 1, padding: 20, justifyContent: 'center' },
  iconContainer: {
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  favoriteIcon: {
    fontSize: 30,
    zIndex: 100,
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    color: colors.primary
  },
  title: { fontSize: 20, fontWeight: 'bold', paddingBottom: 5 },
  description: {}
});
