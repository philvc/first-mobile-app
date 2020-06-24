
// modules
import * as React from 'react';
import { View, TextInput, Text, Button, StyleSheet, TouchableOpacity, } from 'react-native';
import { useMutation, useApolloClient, useQuery } from '@apollo/client';

// components
import Header from '../../header';

// reducer
import { actions, reducer } from './reducer'

// graphql
import { UPDATE_DAG_RAPPORT } from '../../../graphql/mutations/dag-rapport';
import { GET_DAG_RAPPORT_BY_DATE } from '../../../graphql/queries/dag-rapport';

export default function DagRapportDetails({ navigation, route }: any) {

    console.log(' route params dag rapport', route?.params?.rapport)
    const dagRapport = route?.params?.rapport ? route.params.rapport : { fieldA: '', fieldB: '', fieldC: '', fieldD: '', date: '', id: '' }
    // client
    const client = useApolloClient()

    // // state
    const [state, dispatch] = React.useReducer(reducer, dagRapport)

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

    // effects
    React.useEffect(() => {

        console.log('use effect called')
        console.log('route', dagRapport)
        if (dagRapport) {
            dispatch({ type: actions.QUERY_RESULT, payload: dagRapport })
        }
    }, [dagRapport.id])


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

        navigation.navigate('Find')
    }

    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
            {dagRapport.id ? (
                <View>
                    <Text>Rappord of {state?.date}</Text>
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
                    <Text>FielD</Text>
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={text => handleChange(text, actions.FIELDD_CHANGED)}
                        value={state[actions.FIELDD_CHANGED]}
                        placeholder="Field D"
                    />
                    <Button title='Save' onPress={handleSave} />
                </View>
            ) : (
                    <View style={styles.noRapportSelectedContainer}>
                        <Text style={styles.noRapportSelectedText}>No dag rapport selected...</Text>
                        <TouchableOpacity style={styles.findNavigationButtonContainer} onPress={() => navigation.navigate('Find')}>
                            <Text style={styles.findNavigationButtonText}>Find</Text>
                        </TouchableOpacity>
                    </View>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    noRapportSelectedText: {
        textAlign: 'center',
        width: '100%',
        color: 'red',
    },
    noRapportSelectedContainer: {
        justifyContent: 'center',
        transform: [{ translateY: 250 }],
    },
    findNavigationButtonContainer: {
        alignItems: 'center',
        display: 'flex',
        marginTop: 30,
        marginBottom: 20,
    },
    findNavigationButtonText: {
        backgroundColor: 'rgba(0, 122, 255, 0.12)',
        color: 'rgb(0, 122, 255)',
        padding: 15,
        borderRadius: 8,
    },
});

