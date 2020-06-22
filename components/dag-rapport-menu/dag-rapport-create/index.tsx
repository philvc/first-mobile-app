// modules
import * as React from 'react';
import { Text, View } from 'react-native';
import Header from '../../header';

export default function CreateDagRapport({ navigation }: any) {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header navigation={navigation} />
      <Text>Create</Text>
    </View>
  )
}