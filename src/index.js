import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { StatusBar, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import NoInternet from '~/components/NoInternet';
import remoteConfig from '@react-native-firebase/remote-config';

import { offlineLogin } from './store/modules/auth/slice';

import colors from './theme/colors';
import store from './store';
import Router from './router';
import { setKeys } from './store/modules/config/slice';

const App = () => {
  const [isConnected, setIsConnected] = useState(true);

  const config = async () => {
    await remoteConfig().setDefaults({
      API_PUBLIC_KEY: '',
      API_PRIVATE_KEY: ''
    });
    await remoteConfig().fetchAndActivate();

    const API_PUBLIC_KEY = remoteConfig().getValue('API_PUBLIC_KEY').asString();
    const API_PRIVATE_KEY = remoteConfig()
      .getValue('API_PRIVATE_KEY')
      .asString();
    store.dispatch(setKeys({ API_PRIVATE_KEY, API_PUBLIC_KEY }));
  };

  useEffect(() => {
    config();

    store.dispatch(offlineLogin());

    const unsubscribe = NetInfo.addEventListener(({ isInternetReachable }) => {
      setIsConnected(isInternetReachable);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar
          backgroundColor={colors.primaryDark}
          barStyle={
            !isConnected && Platform.OS === 'ios'
              ? 'dark-content'
              : 'light-content'
          }
        />
        {isConnected ? <Router /> : <NoInternet />}
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
