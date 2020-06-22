// modules
import * as React from 'react';
import { useMutation } from '@apollo/client';
import { View, Button } from 'react-native';

// graphql
import { CREATE_DAG_RAPPORT } from '../../../../../graphql/mutations/dag-rapport'

export default function CreateDagRapport({ navigation }: any) {

    // mutations
    const [createDagRapport] = useMutation(CREATE_DAG_RAPPORT, {
        onCompleted({ createDagRapport }) {
            navigation.navigate('DagRapport', { item: createDagRapport })
        }
    })

    // handlers
    function handleClick() {
        createDagRapport({
            variables: {
                fieldA: '',
                fieldB: '',
                fieldC: '',
                fieldD: '',
            }
        })
    }
    return (
        <View>
            <Button title='Create new dag rapport' onPress={handleClick} />
        </View>
    )
}