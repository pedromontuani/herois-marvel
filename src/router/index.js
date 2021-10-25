/* eslint-disable prettier/prettier */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeTabs from './HomeTabs';
import HeroInfoScreen from '~/screens/HeroInfo';
import SignInScreen from '~/screens/SignIn';
import SignUpScreen from '~/screens/SignUp';

import authSelector from '~/store/modules/auth/selectors';
import { useSelector } from 'react-redux';

import routes from './routes';

const Stack = createStackNavigator();

const Router = () => {
  const isAuthenticated = useSelector(authSelector.isAuthenticated);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isAuthenticated ? (
          <Stack.Group>
            <Stack.Screen
              name={routes.SIGN_UP}
              component={SignInScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={routes.SIGN_UP}
              component={SignUpScreen}
              options={{ headerShown: false }}
            />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen
              name={routes.HOME}
              component={HomeTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={routes.CHARACTER_INFO}
              component={HeroInfoScreen}
              options={{ headerShown: false }}
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
