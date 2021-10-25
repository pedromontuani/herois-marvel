/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { View, FlatList, Share } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import loadingSelector from '~/store/modules/loading/selectors';
import FAB from '~/components/FloatingActionButton';

import Card from '~/components/Card';
import NoData from '~/components/NoData';
import { setFavorites } from '~/store/modules/heroes/slice';

import heroesSelector from '~/store/modules/heroes/selectors';
import authSelector from '~/store/modules/auth/selectors';

import { findHeroesByQuery } from '~/api/heroes';
import styles from './styles';
import colors from '~/theme/colors';
import routes from '~/router/routes';
import {
  getFavoritesListObservable,
  removeFavorite
} from '~/services/favorites';
import { setLoading } from '~/store/modules/loading/slice';

const EnterprisesScreen = ({ navigation }) => {
  const user = useSelector(authSelector.getUser);
  const favorites = useSelector(heroesSelector.favorites);
  const dispatch = useDispatch();

  const onPressCard = character => {
    navigation.navigate(routes.CHARACTER_INFO, { characterId: character.id });
  };

  const onPressFavorite = async ({ id }) => {
    await removeFavorite({ uid: user?.uid, characterId: id });
  };

  const onPressShare = async () => {
    const favList = favorites
      .map((fav, index) => `${index + 1} - ${fav.name}`)
      .join('\n');
    const message = `Ei! Olhe só minha lista de heróis da Marvel favoritos :)\n\n${favList}`;

    Share.share({ message });
  };

  const renderItem = ({ item }) => (
    <Card
      imageUrl={item.imageUrl}
      title={item.name}
      favorite
      onPress={() => onPressCard(item)}
      onPressFavorite={() => onPressFavorite(item)}
    />
  );

  const showNoData = () => <NoData />;

  useEffect(() => {
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <FlatList
          style={styles.container}
          contentContainerStyle={styles.flatListContent}
          data={favorites}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          scrollEventThrottle={1}
          ListEmptyComponent={showNoData}
        />
        {favorites.length > 0 && <FAB onPress={onPressShare} icon='share' />}
      </View>
    </SafeAreaView>
  );
};

export default EnterprisesScreen;
