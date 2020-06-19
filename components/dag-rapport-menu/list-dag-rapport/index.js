// modules
import * as React from 'react';
import { Button } from 'react-native';
import { useMutation } from '@apollo/client';

// components
import DatePicker from './components/date-picker'

// graphql
import { CREATE_DAG_RAPPORT } from '../../../graphql/mutations/dag-rapport'

export default function ListDagRapport({ navigation }) {

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
        <div>
            List Dag Rapport
            <Button title='Create new dag rapport' onPress={handleClick} />
            <DatePicker />
        </div>
    )
}