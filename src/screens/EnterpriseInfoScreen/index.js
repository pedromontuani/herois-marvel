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
import { useSelector } from 'react-redux';
import loadingSelector from '~/store/modules/loading/selectors';
import Loading from '~/components/Loading';

import styles, { gradient } from './styles';

import { getById } from '~/api/heroes';
import variables from '~/theme/variables';
import { findByCharacterId } from '~/api/comics';

const EnterpriseInfoScreen = ({ navigation, route }) => {
  const [characterData, setCharacterData] = useState({});
  const [urls, setUrls] = useState([]);
  const [comics, setComics] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const isLoading = useSelector(loadingSelector.isVisible);
  const { characterId } = route.params;

  const getCharacterPhoto = () =>
    `${characterData.thumbnail.path}/landscape_amazing.${characterData.thumbnail.extension}`;

  const onPressLike = () => {
    console.log('cilcou');
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

  const getComicImageUrl = comic =>
    `${comic.thumbnail.path}/portrait_medium.${comic.thumbnail.extension}`;

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
        setCharacterData(data.data.results[0]);
        const links = data.data.results[0].urls.filter(url => {
          return ['detail', 'wiki', 'comiclink'].includes(url.type);
        });
        setUrls(links);
      });
      await findByCharacterId(characterId).then(({ data }) => {
        const comicsData = data.data.results.map(comic => ({
          id: comic.id,
          title: comic.title,
          imageUrl: getComicImageUrl(comic),
          url: comic.urls.find(({ type }) => type === 'detail')?.url
        }));
        setComics(comicsData);
      });
    } finally {
      setIsReady(true);
    }
  };

  useEffect(() => {
    fetchCharacterData();
  }, []);

  return isLoading || !isReady ? (
    <Loading />
  ) : (
    <SafeAreaView style={styles.container}>
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
              name={characterData.liked ? 'star' : 'star-outline'}
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
                  keyExtractor={item => item.id.toString()}
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

export default EnterpriseInfoScreen;
