import React from 'react';

import {
  View,
  Text,
  Animated,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';

const MainHeader = ({
  headerHeight,
  user,
  searchTerm,
  setSearchTerm,
  onSubmitSearch,
  onSignOut
}) => {
  const getUserPhoto = () =>
    user?.photoURL ? { uri: user.photoURL } : require('~/assets/no-photo.png');

  return (
    <Animated.View style={[{ height: headerHeight }, styles.container]}>
      <Animated.View style={styles.userInfoContainer}>
        <Animated.View style={styles.userInfoContent}>
          <Image
            source={getUserPhoto()}
            style={styles.userImage}
            resizeMode='cover'
          />
          <Animated.View style={styles.userNameContainer}>
            <Text numberOfLines={1} style={styles.userNameText}>
              {user?.displayName}
            </Text>
          </Animated.View>
        </Animated.View>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={onSignOut}>
            <Icon style={styles.logoutIcon} name='logout' />
          </TouchableOpacity>
        </View>
      </Animated.View>
      <View style={styles.searchInputContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder={'Busque personagens por nome...'}
          value={searchTerm}
          onChangeText={setSearchTerm}
          onSubmitEditing={onSubmitSearch}
        />
        <TouchableOpacity
          onPress={onSubmitSearch}
          style={styles.searchIconContainer}
        >
          <Icon style={styles.searchIcon} name='search' />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default MainHeader;
