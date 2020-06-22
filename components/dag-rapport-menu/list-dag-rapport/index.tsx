// modules
import * as React from 'react';
import { View, Text } from 'react-native';

// components
import DatePicker from '../dag-rapport-create/components/date-picker'
import CreateDagRapport from '../dag-rapport-create/components/create-dag-rapport-button';

export default function ListDagRapport({ navigation }: any) {


    return (
        <View>
            <Text>List Dag Rapport</Text>
            <CreateDagRapport navigation={navigation} />
            <DatePicker navigation={navigation} />
        </View>
    )
}