import React from 'react';
import { View, Image, Text } from 'react-native';

import styles from './styles';

const NoInternet = () => (
  <View style={styles.container}>
    <Image
      style={styles.image}
      source={require('~/assets/no-connection.png')}
      resizeMode="contain"
    />
    <Text style={styles.text}>No internet connection available</Text>
  </View>
);

export default NoInternet;
