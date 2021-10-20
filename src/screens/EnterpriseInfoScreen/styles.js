import { StyleSheet } from 'react-native';
import colors from '~/theme/colors';

export const gradient = ['rgba(0,0,0,0.6)', 'rgba(0,0,0,0)'];

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  customNavBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 60,
    width: '100%',
    padding: 10,
    elevation: 3,
    zIndex: 100,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonContainer: { padding: 5 },
  backButtonIcon: {
    fontSize: 26,
    color: colors.white,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',

    paddingBottom: 20,
    color: colors.primary,
  },
  detailsContainer: {
    flexDirection: 'row',
    paddingBottom: 20,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexWrap: 'nowrap',
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 35,
  },
  detailIcon: {
    fontSize: 22,
    color: colors.darkGray,
  },
  detailText: {
    paddingLeft: 5,
  },
  description: {
    fontSize: 15,
  },
  image: {
    height: 250,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  footer: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    elevation: 5,
  },
  socialIconContainer: {
    padding: 10,
  },
  socialIcon: {
    fontSize: 26,
    color: colors.primary,
  },
  socialIconDisabled: {
    opacity: 0.6,
  },
});
