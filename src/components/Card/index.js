import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

import styles from './styles';

const Card = ({ title, imageUrl, description, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        style={styles.image}
        source={{ uri: imageUrl }}
        resizeMode='cover'
      />
      <View style={styles.contentOuter}>
        <View style={styles.contentInner}>
          <Text style={styles.title}>{title}</Text>
          <Text numberOfLines={2} style={styles.description}>
            {description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;
