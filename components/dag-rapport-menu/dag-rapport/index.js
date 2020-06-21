import * as React from 'react';

// modules
import { View, TextInput, Text, Button } from 'react-native';

export default function DagRapport() {

    const [value, onChangeText] = React.useState('')

    function handleSave() {
        console.log('saving inputText')
    }

    return (
        <View>
            <Text>Heures</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => onChangeText(text)}
                value={value}
                placeholder="Entrez vos heures de travail"
            />
            <Button title='Save' onPress={handleSave} />
        </View>
    )
}

