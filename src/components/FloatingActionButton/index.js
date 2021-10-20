import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';

const FloatingActionButton = ({ onPress }) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <Icon name="filter-list" style={styles.icon} />
  </TouchableOpacity>
);

export default FloatingActionButton;
