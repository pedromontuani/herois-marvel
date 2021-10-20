import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  ImageBackground,
  Image,
  ActivityIndicator,
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import authSelector from '~/store/modules/auth/selectors';
import { login } from '~/store/modules/auth/actions';

import RoundButton from '~/components/RoundButton';

import colors from '~/theme/colors';
import styles from './styles';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const isLoading = useSelector(authSelector.isLoading);

  const dispatch = useDispatch();

  const onChangeEmail = (text) => {
    setEmail(text);
    setEmailValid(true);
  };

  const onChangePassword = (text) => {
    setPassword(text);
    setPasswordValid(true);
  };

  const validate = () => {
    const emailValidation = email.match(/^[^\s@]+@[^\s@]+$/);
    const passwordValidation = !!password.trim();
    setEmailValid(emailValidation);
    setPasswordValid(passwordValidation);

    return emailValidation && passwordValidation;
  };

  const onSubmit = () => {
    if (validate()) {
      dispatch(login(email, password));
    }
  };

  return (
    <ImageBackground
      style={styles.viewport}
      source={require('~/assets/login-background/background.png')}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.logoHolder}>
          <Image
            style={styles.firebaseLogo}
            source={require('~/assets/logo_ioasys.png')}
            resizeMode="contain"
          />
        </View>

        <View style={styles.inputsHolder}>
          <TextInput
            style={styles.textInput}
            underlineColorAndroid={emailValid ? colors.white : colors.error}
            placeholderTextColor={emailValid ? colors.white : colors.error}
            placeholder="Email"
            autoCompleteType="email"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoCapitalize="none"
            onChangeText={onChangeEmail}
          />

          <TextInput
            style={styles.textInput}
            underlineColorAndroid={passwordValid ? colors.white : colors.error}
            placeholderTextColor={passwordValid ? colors.white : colors.error}
            placeholder="Senha"
            textContentType="password"
            secureTextEntry
            onChangeText={onChangePassword}
          />
        </View>

        <View style={styles.buttonsHolder}>
          <RoundButton
            backgroundColor={colors.white}
            borderColor={colors.transparent}
            disabled={isLoading}
            onPress={onSubmit}
          >
            {isLoading ? (
              <ActivityIndicator size="large" color={colors.primary} />
            ) : (
              <Text style={styles.textFullButton}>LOGIN</Text>
            )}
          </RoundButton>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default SignInScreen;
