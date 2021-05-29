import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from './src/pages/Home'
import Aulas from './src/pages/Aulas'

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="Home" component={Home} options={{
           tabBarIcon: () => (
            <MaterialCommunityIcons name="home" size={32} />
          ),
        }} />
        <Tab.Screen name="Aulas" component={Aulas} options={{
           tabBarIcon: () => (
            <MaterialCommunityIcons name="school" size={32} />
          ),
        }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}