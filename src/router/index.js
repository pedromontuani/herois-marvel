/* eslint-disable prettier/prettier */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeTabs from './HomeTabs';
import EnterpriseInfoScreen from '~/screens/EnterpriseInfoScreen';
import SignInScreen from '~/screens/SignInScreen';
import SignUpScreen from '~/screens/SignUpScreen';

import routes from './routes';

const Stack = createStackNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
