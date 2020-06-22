
// modules
import * as React from 'react';
import { View, TextInput, Text, Button } from 'react-native';
import { useMutation, useApolloClient } from '@apollo/client';

// reducer
import { actions, reducer } from './reducer'

// graphql
import { UPDATE_DAG_RAPPORT } from '../../../graphql/mutations/dag-rapport';
import { GET_DAG_RAPPORT_BY_DATE } from '../../../graphql/queries/dag-rapport';

export default function DagRapportDetails({ navigation, route }: any) {
    const { item } = route.params
    const [state, dispatch] = React.useReducer(reducer, item)

    // client
    const client = useApolloClient()

    // mutations
    const [updateDagRapport] = useMutation(UPDATE_DAG_RAPPORT, {
        onCompleted({ updateDagRapport }) {

            client.writeQuery({
                query: GET_DAG_RAPPORT_BY_DATE,
                variables: {
                    date: state.date
                },
                data: {
                    dagRapportByDate: updateDagRapport
                }
            })
        }
    })

    // handlers
    function handleChange(inputData: any, actionType: any) {
        updateDagRapport({
            variables: {
                id: state.id,
                field: actionType,
                data: inputData
            }
        })
        dispatch({ type: actionType, payload: inputData })
    }

    function handleSave() {

        navigation.navigate('ListDagRapport')
    }

    return (
        <View>
            <Text>FieldA</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => handleChange(text, actions.FIELDA_CHANGED)}
                value={state[actions.FIELDA_CHANGED]}
                placeholder="Field A"
            />
            <Text>FieldB</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => handleChange(text, actions.FIELDB_CHANGED)}
                value={state[actions.FIELDB_CHANGED]}
                placeholder="Field B"
            />
            <Text>FieldC</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => handleChange(text, actions.FIELDC_CHANGED)}
                value={state[actions.FIELDC_CHANGED]}
                placeholder="Field C"
            />
            <Text>FieldD</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => handleChange(text, actions.FIELDD_CHANGED)}
                value={state[actions.FIELDD_CHANGED]}
                placeholder="Field D"
            />
            <Button title='Save' onPress={handleSave} />
        </View>
    )
}

