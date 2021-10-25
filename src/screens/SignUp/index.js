import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  ImageBackground,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { launchImageLibrary } from 'react-native-image-picker';

import { useSelector, useDispatch } from 'react-redux';
import authSelector from '~/store/modules/auth/selectors';
import { signUp } from '~/store/modules/auth/slice';

import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import RoundButton from '~/components/RoundButton';

import styles from './styles';
import colors from '~/theme/colors';
import validation from './validation';

const SignUp = props => {
  const [avatar, setAvatar] = useState(undefined);

  const isLoading = useSelector(authSelector.isLoading);
  const dispatch = useDispatch();

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

  const onSignUp = ({ name, email, password }) => {
    dispatch(signUp({ name, email, password, photo: avatar }));
  };

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validation),
    mode: 'onSubmit',
    reValidateMode: 'onChange'
  });

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
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.textInput, errors.name && styles.invalidTextInput]}
              underlineColorAndroid={'transparent'}
              placeholderTextColor={!errors.name ? colors.white : colors.error}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder='Nome'
              autoCapitalize='words'
            />
          )}
          name='name'
          defaultValue=''
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.textInput,
                errors.email && styles.invalidTextInput
              ]}
              underlineColorAndroid={'transparent'}
              placeholderTextColor={!errors.email ? colors.white : colors.error}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder='Email'
              autoCompleteType='email'
              keyboardType='email-address'
              textContentType='emailAddress'
              autoCapitalize='none'
            />
          )}
          name='email'
          defaultValue=''
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.textInput,
                errors.password && styles.invalidTextInput
              ]}
              underlineColorAndroid={'transparent'}
              placeholderTextColor={
                !errors.password ? colors.white : colors.error
              }
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder='Senha'
              secureTextEntry
            />
          )}
          name='password'
          defaultValue=''
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.textInput,
                errors.confirmPassword && styles.invalidTextInput
              ]}
              underlineColorAndroid={'transparent'}
              placeholderTextColor={
                !errors.confirmPassword ? colors.white : colors.error
              }
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder='Confirmar senha'
              secureTextEntry
            />
          )}
          name='confirmPassword'
          defaultValue=''
        />
      </View>
      <View style={styles.buttonsHolder}>
        <RoundButton
          backgroundColor={colors.white}
          borderColor={'transparent'}
          onPress={handleSubmit(onSignUp)}
        >
          {isLoading ? (
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
