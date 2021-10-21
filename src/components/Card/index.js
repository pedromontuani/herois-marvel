import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import variables from '~/theme/variables';

import styles from './styles';

const Card = ({ title, imageUrl, onPress, favorite, onPressLike }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        style={styles.image}
        source={{ uri: imageUrl }}
        resizeMode='cover'
      />
      <View style={styles.contentOuter}>
        <View style={styles.contentInner}>
          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity hitSlop={variables.hitSlop} onPress={onPressLike}>
            <Icon
              name={favorite ? 'star' : 'star-outline'}
              style={styles.favoriteIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;
