// modules
import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../header';

export default function TaskMenu({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <Text>Task Menu</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});