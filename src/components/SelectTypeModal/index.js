import React, { useState, useEffect } from 'react';
import {
  Modal,
  Text,
  View,
  FlatList,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { RadioButtonInput } from 'react-native-simple-radio-button';

import colors from '~/theme/colors';
import styles from './styles';

const SelectTypeModal = ({
  modalVisible,
  setModalVisible,
  enterpriseTypes,
  selectedType,
  setSelectedType,
  onConfirm = () => {},
}) => {
  const [tempSelected, setTempSelected] = useState(undefined);

  const isSelected = (item) => item.id === selectedType?.id;

  const renderItem = ({ item }) => (
    <TouchableNativeFeedback onPress={() => setSelectedType(item)}>
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>{item.name}</Text>
        <RadioButtonInput
          obj={{}}
          isSelected={isSelected(item)}
          borderWidth={1.5}
          buttonInnerColor={colors.primary}
          buttonOuterColor={isSelected(item) ? colors.primary : colors.darkGray}
          buttonSize={12}
          buttonOuterSize={20}
          onPress={() => setSelectedType(item)}
        />
      </View>
    </TouchableNativeFeedback>
  );
  const closeModal = () => {
    setModalVisible(false);
  };

  const onCancel = () => {
    setSelectedType(tempSelected);
    closeModal();
  };

  const setFilter = () => {
    onConfirm();
    closeModal();
  };

  useEffect(() => {
    if (modalVisible) {
      setTempSelected(selectedType);
    }
  }, [modalVisible]);

  return (
    <Modal
      animationType="fade"
      hardwareAccelerated
      transparent
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.centeredView}>
          <TouchableWithoutFeedback>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Filter by type</Text>
              <FlatList
                data={enterpriseTypes}
                renderItem={renderItem}
                keyExtractor={(item) => item.name}
              />
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  onPress={onCancel}
                  style={styles.buttonTouchable}
                >
                  <Text style={styles.modalButton}>CANCEL</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={setFilter}
                  style={styles.buttonTouchable}
                >
                  <Text style={styles.modalButton}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default SelectTypeModal;
