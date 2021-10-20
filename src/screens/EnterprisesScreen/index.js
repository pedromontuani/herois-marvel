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

import MainHeader from '~/components/MainHeader';
import Card from '~/components/Card';
import NoData from '~/components/NoData';

import { findHeroesByQuery } from '~/api/heroes';
import styles from './styles';
import variables from '~/theme/variables';
import colors from '~/theme/colors';

const EnterprisesScreen = ({ navigation }) => {
  const [heroes, setHeroes] = useState([]);
  const [searchTerm, setSearchTerm] = useState(undefined);
  const [lastOffset, setLastOffset] = useState(0);
  const perPage = 20;
  const loading = useSelector(loadingSelector.isVisible);
  const scrollY = new Animated.Value(0);

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
      if (offset) {
        setHeroes([...heroes, ...data.data.results]);
      } else {
        setHeroes(data.data.results);
      }
      setLastOffset(data.data.offset);
    });
  };

  const onPressCard = character => {
    navigation.navigate('EnterpriseInfo', { characterId: character.id });
  };

  const renderItem = ({ item }) => (
    <Card
      imageUrl={`${item.thumbnail.path}/landscape_xlarge.${item.thumbnail.extension}`}
      title={item.name}
      description={item.description}
      onPress={() => onPressCard(item)}
    />
  );

  const showNoData = () => !loading && <NoData />;

  const showIndicator = () => <ActivityIndicator />;

  useEffect(() => {
    getHeroes();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={styles.container}>
        <MainHeader
          // user={user}
          headerHeight={headerHeight}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSubmitSearch={getHeroes}
          // onSignOut={signOut}
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
