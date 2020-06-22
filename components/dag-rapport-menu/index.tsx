// modules
import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// components
import FindDagRapport from './dag-rapport-find'
import CreateDagRapport from './dag-rapport-create';

const Tab = createBottomTabNavigator();

export default function DagRapportMenu() {
  return (
    <View>
      <Text>Rapport Menu</Text>
      <Text>Rapport Menu</Text>
      <Tab.Navigator initialRouteName="Find">
        <Tab.Screen name="Find" component={FindDagRapport} />
        <Tab.Screen name="Create" component={CreateDagRapport} />
      </Tab.Navigator>
    </View>
  )
}