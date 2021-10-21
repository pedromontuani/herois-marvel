import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EnterprisesScreen from '~/screens/EnterprisesScreen';
import FavoritesScreen from '~/screens/FavoritesScreen';
import colors from '~/theme/colors';
import routes from './routes';

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.darkGray,
        tabBarStyle: {
          backgroundColor: colors.lightGray
        },
        tabBarIcon: ({ color, size }) => {
          return <Icon name={route.params.icon} size={size} color={color} />;
        }
      })}
    >
      <Tab.Screen
        name={routes.CHARACTERS}
        component={EnterprisesScreen}
        options={{ headerShown: false }}
        initialParams={{ icon: 'home' }}
      />
      <Tab.Screen
        name={routes.FAVORITES}
        component={FavoritesScreen}
        options={{ headerShown: false }}
        initialParams={{ icon: 'star' }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabs;
