// modules
import * as React from 'react';
import { Text, View } from 'react-native';

// components
import Header from '../../header';
import CreateDagRapportButton from './components/create-dag-rapport-button';

export default function CreateDagRapport({ navigation }: any) {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header navigation={navigation} />
      <CreateDagRapportButton navigation={navigation} />
    </View>
  )
}