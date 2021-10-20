import React from 'react';
import { View, Image, Text } from 'react-native';
import styles from './styles';

const EmptyList = () => (
  <View style={styles.container}>
    <Image source={require('~/assets/no-data/no-data.png')} />
    <Text style={styles.text}>No data to show</Text>
  </View>
);

export default EmptyList;
