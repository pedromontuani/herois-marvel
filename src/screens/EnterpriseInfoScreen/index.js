import React, { useState, useEffect } from 'react';
import { View, Image, ScrollView, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import loadingSelector from '~/store/modules/loader/selectors';
import Loading from '~/components/Loading';

import styles, { gradient } from './styles';

import { getById } from '~/api/heroes';

const EnterpriseInfoScreen = ({ navigation, route }) => {
  const [characterData, setCharacterData] = useState({});
  const [isReady, setIsReady] = useState(false);
  const isLoading = useSelector(loadingSelector.isVisible);
  const { characterId } = route.params;

  const getCharacterPhoto = () =>
    `${characterData.thumbnail.path}/landscape_amazing.${characterData.thumbnail.extension}`;

  useEffect(() => {
    getById(characterId)
      .then(({ data }) => {
        setCharacterData(data.data.results[0]);
      })
      .finally(() => {
        setIsReady(true);
      });
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
            <Icon style={styles.backButtonIcon} name='arrow-back' />
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
            <Text style={styles.description}>{characterData.description}</Text>
          </View>
        </ScrollView>
        {/* <View style={styles.footer}>
          {socialMedias.map((social) => (
            <TouchableOpacity
              key={social.type}
              onPress={() => openUrl(social)}
              disabled={() => iconDisabled(social)}
              style={styles.socialIconContainer}
            >
              <SocialIcon
                style={[
                  styles.socialIcon,
                  iconDisabled(social) && styles.socialIconDisabled,
                ]}
                name={social.type}
              />
            </TouchableOpacity>
          ))}
        </View> */}
      </View>
    </SafeAreaView>
  );
};

export default EnterpriseInfoScreen;
