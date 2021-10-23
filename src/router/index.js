/* eslint-disable prettier/prettier */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeTabs from './HomeTabs';
import EnterpriseInfoScreen from '~/screens/EnterpriseInfoScreen';
import SignInScreen from '~/screens/SignInScreen';
import SignUpScreen from '~/screens/SignUpScreen';

import authSelector from '~/store/modules/auth/selectors';
import { useSelector } from 'react-redux';

import routes from './routes';

const Stack = createStackNavigator();

const Router = () => {
  const isAuthenticated = useSelector(authSelector.isAuthenticated);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <Stack.Group>
            <Stack.Screen
              name='SignIn'
              component={SignInScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='SignUp'
              component={SignUpScreen}
              options={{ headerShown: false }}
            />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen
              name='Home'
              component={HomeTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={routes.CHARACTER_INFO}
              component={EnterpriseInfoScreen}
              options={{ headerShown: false }}
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
