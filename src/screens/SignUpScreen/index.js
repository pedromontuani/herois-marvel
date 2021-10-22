import React, { useState } from 'react';
import {
  Alert,
  Text,
  View,
  TextInput,
  ImageBackground,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { launchImageLibrary } from 'react-native-image-picker';

import styles from './styles';
import colors from '../../theme/colors';
import RoundButton from '../../components/RoundButton';
import { createUser } from '~/services/auth';

const SignUp = props => {
  const [avatar, setAvatar] = useState(undefined);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const imagePickerOptions = {
    mediaType: 'photo',
    maxWidth: 500,
    maxHeight: 500,
    rotation: 0,
    noData: true
  };

  const selectAvatar = () => {
    launchImageLibrary(imagePickerOptions, ({ assets }) => {
      setAvatar(assets[0]);
    });
  };

  const signUp = async () => {
    try {
      setLoading(true);
      await createUser({ name, email, password, photo: avatar });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      style={styles.viewport}
      source={require('~/assets/login-background/background.png')}
      resizeMode={'cover'}
    >
      <TouchableOpacity onPress={selectAvatar} style={styles.avatarHolder}>
        <Image
          style={styles.avatar}
          source={
            avatar && avatar.uri
              ? { uri: avatar.uri }
              : require('~/assets/no-photo.png')
          }
          resizeMode={'cover'}
        />
        <Icon name='plus-circle' style={styles.avatarSelection} />
      </TouchableOpacity>

      <View style={styles.inputsHolder}>
        <TextInput
          onChangeText={text => setName(text)}
          style={styles.textInput}
          underlineColorAndroid={colors.white}
          placeholderTextColor={colors.white}
          placeholder={'Nome'}
          autoCompleteType={'name'}
          textContentType={'name'}
          autoCapitalize={'words'}
        />
        <TextInput
          onChangeText={text => setEmail(text)}
          style={styles.textInput}
          underlineColorAndroid={colors.white}
          placeholderTextColor={colors.white}
          placeholder={'Email'}
          autoCompleteType={'email'}
          keyboardType={'email-address'}
          textContentType={'emailAddress'}
          autoCapitalize={'none'}
        />
        <TextInput
          onChangeText={text => setPassword(text)}
          style={styles.textInput}
          underlineColorAndroid={colors.white}
          placeholderTextColor={colors.white}
          placeholder={'Senha'}
          textContentType={'password'}
          secureTextEntry={true}
        />
        <TextInput
          onChangeText={text => setVerifyPassword(text)}
          style={styles.textInput}
          underlineColorAndroid={colors.white}
          placeholderTextColor={colors.white}
          placeholder={'Repetir senha'}
          textContentType={'password'}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.buttonsHolder}>
        <RoundButton
          backgroundColor={colors.white}
          borderColor={'transparent'}
          onPress={signUp}
        >
          {loading ? (
            <ActivityIndicator size={'large'} color={colors.primary} />
          ) : (
            <Text style={styles.textFullButton}>CADASTRE-SE</Text>
          )}
        </RoundButton>
        <RoundButton
          backgroundColor={'transparent'}
          borderColor={'transparent'}
          onPress={() => {
            props.navigation.goBack();
          }}
        >
          <Text style={styles.textOutlineButton}>
            Já possui uma conta?
            <Text style={{ fontWeight: 'bold' }}> Faça o login!</Text>
          </Text>
        </RoundButton>
      </View>
    </ImageBackground>
  );
};

export default SignUp;
