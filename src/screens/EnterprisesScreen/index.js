/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import {
  Animated,
  Easing,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import loadingSelector from '~/store/modules/loading/selectors';
import authSelector from '~/store/modules/auth/selectors';

import MainHeader from '~/components/MainHeader';
import Card from '~/components/Card';
import NoData from '~/components/NoData';

import { findHeroesByQuery } from '~/api/heroes';
import styles from './styles';
import variables from '~/theme/variables';
import colors from '~/theme/colors';
import routes from '~/router/routes';
import {
  addFavorite,
  getFavoritesList,
  removeFavorite
} from '~/services/favorites';
import { dispatch } from 'node_modules/rxjs/internal/observable/pairs';
import { logout } from '~/store/modules/auth/slice';

const EnterprisesScreen = ({ navigation }) => {
  const [heroes, setHeroes] = useState([]);
  const [searchTerm, setSearchTerm] = useState(undefined);
  const [lastOffset, setLastOffset] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const perPage = 20;
  const loading = useSelector(loadingSelector.isVisible);
  const user = useSelector(authSelector.getUser);
  const scrollY = new Animated.Value(0);
  const dispatch = useDispatch();

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 300],
    outputRange: [variables.headerMaxHeight, variables.headerMinHeight],
    extrapolate: 'clamp',
    easing: Easing.quad
  });

  const getHeroes = (offset = 0) => {
    findHeroesByQuery({
      name: searchTerm,
      offset
    }).then(({ data }) => {
      data.data.results = data.data.results.map(res => ({
        ...res,
        id: res.id.toString()
      }));
      if (offset) {
        setHeroes([...heroes, ...data.data.results]);
      } else {
        setHeroes(data.data.results);
      }
      setLastOffset(data.data.offset);
    });
  };

  const onPressCard = character => {
    navigation.navigate(routes.CHARACTER_INFO, { characterId: character.id });
  };

  const getImageUrl = character =>
    `${character.thumbnail.path}/landscape_xlarge.${character.thumbnail.extension}`;

  const isFavorite = ({ id }) => favorites.includes(id.toString());

  const onPressFavorite = async character => {
    if (isFavorite(character)) {
      await removeFavorite({ uid: 'teste', characterId: character.id });
      setFavoritesList(favorites.filter(id => id !== character.id));
    } else {
      await addFavorite({
        uid: 'teste',
        name: character.name,
        characterId: character.id,
        imageUrl: getImageUrl(character)
      });
      setFavorites([...favorites, character.id]);
    }
  };

  const signOut = () => {
    dispatch(logout());
  };

  const showNoData = () => !loading && <NoData />;

  const showIndicator = () => <ActivityIndicator />;

  const renderItem = ({ item }) => (
    <Card
      imageUrl={getImageUrl(item)}
      title={item.name}
      favorite={isFavorite(item)}
      onPress={() => onPressCard(item)}
      onPressFavorite={() => onPressFavorite(item)}
    />
  );

  useEffect(() => {
    getHeroes();
    getFavoritesList('teste').then(data => {
      setFavorites(data.map(character => character.id));
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={styles.container}>
        <MainHeader
          user={user}
          headerHeight={headerHeight}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSubmitSearch={getHeroes}
          onSignOut={signOut}
        />
        <Animated.FlatList
          refreshControl={
            <RefreshControl
              colors={[colors.primary]}
              refreshing={loading}
              onRefresh={getHeroes}
            />
          }
          style={styles.container}
          contentContainerStyle={styles.flatListContent}
          data={heroes}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          scrollEventThrottle={1}
          onEndReached={() => getHeroes(lastOffset + perPage)}
          onEndReachedThreshold={0.1}
          ListEmptyComponent={showNoData}
          ListFooterComponent={showIndicator}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
        />
      </Animated.View>
    </SafeAreaView>
  );
};

export default EnterprisesScreen;
