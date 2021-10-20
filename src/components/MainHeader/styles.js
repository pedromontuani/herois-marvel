import { StyleSheet } from 'react-native';
import colors from '~/theme/colors';

export default StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
    backgroundColor: '#EEE',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    zIndex: 100,
  },
  userInfoContainer: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfoContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  userImage: {
    backgroundColor: colors.gray,
    height: 56,
    width: 56,
    borderRadius: 56,
    borderColor: colors.white,
    borderWidth: 4,
  },
  userNameContainer: { paddingLeft: 10, flex: 1 },
  userNameText: {
    color: colors.white,
    fontSize: 20,
    flexWrap: 'wrap',
    paddingLeft: 5,
  },
  iconContainer: {
    height: 48,
    width: 48,
    backgroundColor: colors.primary,
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  logoutIcon: { fontSize: 28, color: colors.white },
  searchInputContainer: {
    height: 60,
    flexDirection: 'row',
    paddingHorizontal: 20,
    elevation: 5,
    backgroundColor: colors.lightGray,
  },
  searchInput: {
    flex: 1,
  },
  searchIconContainer: {
    alignSelf: 'center',
    paddingHorizontal: 20,
    marginRight: -20,
  },
  searchIcon: {
    fontSize: 24,
    color: '#BBB',
  },
});
