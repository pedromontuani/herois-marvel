import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  Linking,
  FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import loadingSelector from '~/store/modules/loading/selectors';
import heroesSelector from '~/store/modules/heroes/selectors';
import authSelector from '~/store/modules/auth/selectors';
import { setFavorites } from '~/store/modules/heroes/slice';

import Loading from '~/components/Loading';

import {
  addFavorite,
  removeFavorite,
  getFavoritesListObservable
} from '~/services/favorites';

import styles, { gradient } from './styles';
import variables from '~/theme/variables';

import { getById } from '~/api/heroes';
import { findByCharacterId } from '~/api/comics';
import { setLoading } from '~/store/modules/loading/slice';

const HeroInfoScreen = ({ navigation, route }) => {
  const [characterData, setCharacterData] = useState({});
  const [urls, setUrls] = useState([]);
  const [comics, setComics] = useState([]);
  const { characterId } = route.params;
  const isLoading = useSelector(loadingSelector.isVisible);
  const favorites = useSelector(heroesSelector.favorites);
  const user = useSelector(authSelector.getUser);
  const dispatch = useDispatch();

  const getCharacterPhoto = () => {
    const path = characterData?.thumbnail?.path.replace('http://', 'https://');
    return `${path}/landscape_amazing.${characterData?.thumbnail?.extension}`;
  };

  const onPressLike = async () => {
    if (isFavorite()) {
      await removeFavorite({ uid: user.uid, characterId: characterData.id });
    } else {
      const char = {
        name: characterData.name,
        id: characterData.id,
        imageUrl: getCharacterPhoto()
      };
      await addFavorite({
        uid: user.uid,
        name: char.name,
        characterId: char.id,
        imageUrl: char.imageUrl
      });
    }
  };

  const openUrl = ({ url }) => Linking.openURL(url);

  const getUrlIcon = url => {
    switch (url.type) {
      case 'detail':
        return 'account-circle';
      case 'wiki':
        return 'language';
      case 'comiclink':
        return 'auto-stories';
      default:
        return 'link';
    }
  };

  const getComicImageUrl = comic => {
    const path = comic?.thumbnail?.path.replace('http://', 'https://');
    return `${path}/portrait_medium.${comic.thumbnail.extension}`;
  };

  const isFavorite = () => !!favorites.find(fav => fav.id === characterData.id);

  const renderItem = ({ item }) => (
    <View style={{ flexDirection: 'column', paddingRight: 20, width: 135 }}>
      <TouchableOpacity onPress={() => item.url && openUrl(item)}>
        <Image
          style={{ height: 160 }}
          source={{ uri: item.imageUrl }}
          resizeMode='cover'
        />
        <Text style={{ paddingTop: 5 }} numberOfLines={2}>
          {item.title}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const fetchCharacterData = async () => {
    try {
      await getById(characterId).then(({ data }) => {
        const char = {
          ...data.data.results[0],
          id: data.data.results[0].id.toString()
        };
        setCharacterData(char);
        const links = data.data.results[0].urls.filter(url => {
          return ['detail', 'wiki', 'comiclink'].includes(url.type);
        });
        setUrls(links);
      });
      await findByCharacterId(characterId).then(({ data }) => {
        const comicsData = data.data.results.map(comic => ({
          id: comic.id.toString(),
          title: comic.title,
          imageUrl: getComicImageUrl(comic),
          url: comic.urls.find(({ type }) => type === 'detail')?.url
        }));
        setComics(comicsData);
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchCharacterData();
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

  return isLoading ? (
    <Loading />
  ) : (
    <SafeAreaView edges={['top']} style={styles.safeAreaView}>
      <View style={styles.container}>
        <LinearGradient colors={gradient} style={styles.customNavBar}>
          <TouchableOpacity
            style={styles.backButtonContainer}
            onPress={() => navigation.goBack()}
          >
            <Icon style={styles.navIcon} name='arrow-back' />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.backButtonContainer}
            onPress={onPressLike}
          >
            <Icon
              style={styles.navIcon}
              name={isFavorite() ? 'star' : 'star-outline'}
            />
          </TouchableOpacity>
        </LinearGradient>
        <ScrollView style={styles.contentContainer}>
          <Image
            style={styles.image}
            source={{ uri: getCharacterPhoto() }}
            resizeMode='cover'
          />
          <View style={styles.content}>
            <Text style={styles.title}>{characterData.name}</Text>
            <Text style={styles.description}>
              {characterData.description || 'Nenhuma descrição fornecida...'}
            </Text>
            {comics?.length > 0 && (
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'stretch',
                  paddingTop: variables.itemPadding
                }}
              >
                <Text style={styles.title}>HQs</Text>
                <FlatList
                  horizontal
                  contentContainerStyle={{ paddingBottom: 5 }}
                  data={comics}
                  renderItem={renderItem}
                  keyExtractor={item => item.id}
                />
              </View>
            )}
          </View>
        </ScrollView>
      </View>
      {urls?.length > 0 && (
        <View style={styles.footer}>
          {urls.map(url => (
            <TouchableOpacity
              key={url.type}
              hitSlop={variables.hitSlop}
              onPress={() => openUrl(url)}
              style={styles.socialIconContainer}
            >
              <Icon style={styles.socialIcon} name={getUrlIcon(url)} />
            </TouchableOpacity>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
};

export default HeroInfoScreen;
