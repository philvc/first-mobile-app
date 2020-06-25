// modules
import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// components
import FindDagRapport from './dag-rapport-find'
import CreateDagRapport from './dag-rapport-create';
import DagRapportDetails from './dag-rapport-details';


const Tab = createBottomTabNavigator();

export default function DagRapportMenu() {

  return (
    <Tab.Navigator
      initialRouteName="Write"
      tabBarOptions={{
        labelStyle: { fontSize: 15 },
        tabStyle: { justifyContent: 'center' }
      }}
    >
      <Tab.Screen name="Find" component={FindDagRapport} options={{ title: 'Find dag rapport' }} />
      <Tab.Screen name="Create" component={CreateDagRapport} />
      <Tab.Screen name="Write" component={DagRapportDetails} />
    </Tab.Navigator>
  )
}