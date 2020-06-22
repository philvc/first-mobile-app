// modules
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Header from '../../header';
import DatePicker from './components/date-picker';

export default function FindDagRapport({ navigation }: any) {
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <Header navigation={navigation} />
            <Text>Find</Text>
            <DatePicker navigation={navigation} />
        </View>
    )
}
