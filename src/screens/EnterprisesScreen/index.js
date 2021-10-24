/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import {
  Animated,
  Easing,
  RefreshControl,
  ActivityIndicator,
  View
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import loadingSelector from '~/store/modules/loading/selectors';
import authSelector from '~/store/modules/auth/selectors';
import heroesSelector from '~/store/modules/heroes/selectors';

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
  removeFavorite,
  getFavoritesListObservable
} from '~/services/favorites';
import { logout } from '~/store/modules/auth/slice';
import {
  setHeroes,
  setHeroesOffset,
  setFavorites
} from '~/store/modules/heroes/slice';

const EnterprisesScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState(undefined);
  const [lastOffset, setLastOffset] = useState(0);
  const perPage = 20;
  const loading = useSelector(loadingSelector.isVisible);
  const user = useSelector(authSelector.getUser);
  const heroes = useSelector(heroesSelector.allHeroes);
  const favorites = useSelector(heroesSelector.favorites);
  const scrollY = new Animated.Value(0);
  const dispatch = useDispatch();

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 300],
    outputRange: [variables.headerMaxHeight, variables.headerMinHeight],
    extrapolate: 'clamp',
    easing: Easing.quad
  });

  const getHeroes = (offset = 0) => {
    console.log('chamou', offset);
    findHeroesByQuery({
      name: searchTerm,
      offset
    }).then(({ data }) => {
      data.data.results = data.data.results.map(res => ({
        ...res,
        id: res.id.toString()
      }));
      if (offset) {
        dispatch(setHeroesOffset(data.data.results));
      } else {
        dispatch(setHeroes(data.data.results));
      }
      setLastOffset(data.data.offset);
    });
  };

  const onPressCard = character => {
    navigation.navigate(routes.CHARACTER_INFO, { characterId: character.id });
  };

  const getImageUrl = character =>
    `${character.thumbnail.path}/landscape_xlarge.${character.thumbnail.extension}`;

  const isFavorite = ({ id }) => !!favorites.find(char => char.id === id);

  const onPressFavorite = async character => {
    if (isFavorite(character)) {
      await removeFavorite({ uid: user.uid, characterId: character.id });
    } else {
      await addFavorite({
        uid: user.uid,
        name: character.name,
        characterId: character.id,
        imageUrl: getImageUrl(character)
      });
    }
  };

  const signOut = () => {
    dispatch(logout());
  };

  const showNoData = () => !loading && <NoData />;

  const showIndicator = () => (
    <View style={{ paddingVertical: 20 }}>
      <ActivityIndicator
        color={colors.primary}
        size={'large'}
        animating={loading && heroes.length > 0}
      />
    </View>
  );

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
    const unsubscribe = getFavoritesListObservable(user?.uid).onSnapshot(
      docs => {
        const list = [];
        docs.forEach(doc => {
          const { name, imageUrl } = doc.data();
          list.push({ id: doc.id, name, imageUrl });
        });
        dispatch(setFavorites(list));
      }
    );
    return () => {
      unsubscribe();
    };
  }, [user]);

  useEffect(() => {
    console.log('heroes', heroes.length);
  }, [heroes]);

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
              refreshing={loading && (scrollY < 20 || !heroes.length)}
              onRefresh={getHeroes}
            />
          }
          style={styles.container}
          contentContainerStyle={styles.flatListContent}
          data={heroes}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          scrollEventThrottle={1}
          onEndReached={() => getHeroes(lastOffset + perPage)}
          onEndReachedThreshold={1}
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
