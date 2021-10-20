import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import styles from './styles';

const RoundButton = ({
  onPress,
  backgroundColor,
  borderColor,
  disabled,
  children,
}) => (
  <View style={styles.buttonHolder}>
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <View style={[styles.buttonOuter, { backgroundColor, borderColor }]}>
        <View style={styles.buttonInner}>
          <View style={styles.buttonInnerContainer}>{children}</View>
        </View>
      </View>
    </TouchableOpacity>
  </View>
);

export default RoundButton;
