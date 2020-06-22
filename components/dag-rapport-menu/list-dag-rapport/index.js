// modules
import * as React from 'react';
import { View, Text } from 'react-native';

// components
import DatePicker from './components/date-picker'
import CreateDagRapport from './components/create-dag-rapport';
import VandaagDagRapport from './components/vandaag-dag-rapport';

export default function ListDagRapport({ navigation }) {


    return (
        <View>
            <Text>List Dag Rapport</Text>
            <CreateDagRapport navigation={navigation} />
            <DatePicker navigation={navigation} />
            <VandaagDagRapport />
        </View>
    )
}