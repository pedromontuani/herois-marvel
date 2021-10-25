import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  ImageBackground,
  Image,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RoundButton from '~/components/RoundButton';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useSelector, useDispatch } from 'react-redux';
import authSelector from '~/store/modules/auth/selectors';
import { login } from '~/store/modules/auth/slice';
import validation from './validation';

import colors from '~/theme/colors';
import styles from './styles';

const SignInScreen = ({ navigation }) => {
  const isLoading = useSelector(authSelector.isLoading);
  const dispatch = useDispatch();

  const onSubmit = async ({ email, password }) => {
    dispatch(login(email, password));
  };

  const onPressSignUp = () => {
    navigation.navigate('SignUp');
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
      resizeMode='cover'
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.logoHolder}>
          <Image
            style={styles.firebaseLogo}
            source={require('~/assets/logo_ioasys.png')}
            resizeMode='contain'
          />
        </View>

        <View style={styles.inputsHolder}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                testID={'email-input'}
                style={[
                  styles.textInput,
                  errors.email && styles.invalidTextInput
                ]}
                underlineColorAndroid={'transparent'}
                placeholderTextColor={
                  !errors.email ? colors.white : colors.error
                }
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
                testID={'password-input'}
                underlineColorAndroid={'transparent'}
                placeholderTextColor={
                  !errors.password ? colors.white : colors.error
                }
                placeholder='Senha'
                textContentType='password'
                secureTextEntry
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                style={[
                  styles.textInput,
                  errors.password && styles.invalidTextInput
                ]}
              />
            )}
            name='password'
            defaultValue=''
          />
        </View>

        <View style={styles.buttonsHolder}>
          <RoundButton
            testID={'submit-button'}
            backgroundColor={colors.white}
            borderColor={colors.transparent}
            disabled={isLoading}
            onPress={handleSubmit(onSubmit)}
          >
            {isLoading ? (
              <ActivityIndicator size='large' color={colors.primary} />
            ) : (
              <Text style={styles.textFullButton}>LOGIN</Text>
            )}
          </RoundButton>
          <RoundButton
            backgroundColor={colors.transparent}
            borderColor={colors.transparent}
            disabled={isLoading}
            onPress={onPressSignUp}
          >
            <Text style={styles.textOutlineButton}>
              Não possui uma conta?
              <Text style={{ fontWeight: 'bold' }}> Cadastre-se!</Text>
            </Text>
          </RoundButton>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default SignInScreen;
