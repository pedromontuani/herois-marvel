import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import NoInternet from '~/components/NoInternet';

import { useDispatch } from 'react-redux';
import { offlineLogin } from './store/modules/auth/slice';

import colors from './theme/colors';
import store from './store';
import Router from './router';

const App = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
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
          barStyle={isConnected ? 'light-content' : 'dark-content'}
        />
        {isConnected ? <Router /> : <NoInternet />}
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
