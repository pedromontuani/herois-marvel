/* eslint-disable prettier/prettier */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import EnterprisesScreen from '~/screens/EnterprisesScreen';
import EnterpriseInfoScreen from '~/screens/EnterpriseInfoScreen';

const Stack = createStackNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Enterprises'
          component={EnterprisesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='EnterpriseInfo'
          component={EnterpriseInfoScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
