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
import loadingSelector from '~/store/modules/loader/selectors';

import Card from '~/components/Card';
import NoData from '~/components/NoData';

import { findHeroesByQuery } from '~/api/heroes';
import styles from './styles';
import colors from '~/theme/colors';
import routes from '~/router/routes';
import {
  getFavoritesList,
  getFavoritesListObservable,
  removeFavorite
} from '~/services/favorites';
import { setLoading } from '~/store/modules/loader/slice';

const EnterprisesScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);

  const onPressCard = character => {
    navigation.navigate(routes.CHARACTER_INFO, { characterId: character.id });
  };

  const onPressFavorite = async ({ id }) => {
    await removeFavorite({ uid: 'teste', characterId: id });
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
    const unsubscribe = getFavoritesListObservable('teste').onSnapshot(docs => {
      const list = [];
      docs.forEach(doc => {
        const { name, imageUrl } = doc.data();
        list.push({ id: doc.id, name, imageUrl });
      });
      setFavorites(list);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={styles.container}>
        <Animated.FlatList
          style={styles.container}
          contentContainerStyle={styles.flatListContent}
          data={favorites}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          scrollEventThrottle={1}
          ListEmptyComponent={showNoData}
        />
      </Animated.View>
    </SafeAreaView>
  );
};

export default EnterprisesScreen;
