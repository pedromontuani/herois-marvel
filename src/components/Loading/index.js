import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import styles from './styles';
import colors from '~/theme/colors';

const Loading = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color={colors.primary} />
  </View>
);

export default Loading;
