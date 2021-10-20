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
import { BASE_URL } from '~/config/index';

import styles from './styles';

const MainHeader = ({
  headerHeight,
  user,
  filterLabel,
  searchTerm,
  setSearchTerm,
  onSubmitSearch,
  onSignOut
}) => {
  // const getUserPhoto = () =>
  //   user?.investor?.photo
  //     ? { uri: `${BASE_URL}/${user.investor.photo}` }
  //     : require('~/assets/no-photo.png');

  // const getPlaceholder = () =>
  //   filterLabel ? `Search in ${filterLabel} enterprises...` : 'Search...';

  return (
    <Animated.View style={[{ height: headerHeight }, styles.container]}>
      <Animated.View style={styles.userInfoContainer}>
        <Animated.View style={styles.userInfoContent}>
          {/* <Image
            source={getUserPhoto()}
            style={styles.userImage}
            resizeMode="cover"
          /> */}
          <Animated.View style={styles.userNameContainer}>
            {/* <Text numberOfLines={1} style={styles.userNameText}>
              {user?.investor?.investor_name}
            </Text> */}
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
