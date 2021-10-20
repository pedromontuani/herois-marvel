import { StyleSheet } from 'react-native';
import colors from '~/theme/colors';

export default StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalView: {
    margin: 20,
    width: 350,
    height: 430,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'stretch',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 15,
  },
  modalButton: {
    color: colors.primary,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 45,
    alignSelf: 'center',
    paddingLeft: 5,
    paddingRight: 15,
    alignItems: 'center',
  },
  itemText: { flex: 1 },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 5,
  },
  buttonTouchable: { paddingHorizontal: 10, paddingVertical: 5 },
});
