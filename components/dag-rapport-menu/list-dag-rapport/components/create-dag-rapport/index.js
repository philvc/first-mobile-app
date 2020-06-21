// modules
import * as React from 'react';
import { useMutation } from '@apollo/client';
import { View, Button } from 'react-native';

// graphql
import { CREATE_DAG_RAPPORT } from '../../../../../graphql/mutations/dag-rapport'

export default function CreateDagRapport() {

    // mutations
    const [createDagRapport] = useMutation(CREATE_DAG_RAPPORT, {
        onCompleted({ createDagRapport }) {
            console.log('result mutation', createDagRapport)
            navigation.navigate('DagRapport')
        }
    })

    // handlers
    function handleClick() {
        createDagRapport({
            variables: {
                siteId: '0',
                input: 'another dag rapport'
            }
        })
    }
    return (
        <View>
            <Button title='Create new dag rapport' onPress={handleClick} />
        </View>
    )
}