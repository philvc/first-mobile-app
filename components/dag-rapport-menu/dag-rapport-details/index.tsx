
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
import ActionModal from '../actionModal';

export default function DagRapportDetails({ navigation, route }: any) {

    const dagRapport = route?.params?.rapport ? route.params.rapport : { fieldA: '', fieldB: '', fieldC: '', fieldD: '', date: '', id: '' }
    // client
    const client = useApolloClient()

    // // state
    const [state, dispatch] = React.useReducer(reducer, dagRapport)
    const [isModalVisible, setIsModalVisible] = React.useState(false)

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
                    <Text style={styles.title}>Rappord of {state?.date}</Text>
                    <TouchableOpacity style={styles.buttonContainer} onPress={() => setIsModalVisible(true)}>
                        <Text style={styles.buttonText}>Actions</Text>
                    </TouchableOpacity>
                    {isModalVisible && (
                        <View style={styles.modalContainer}>
                            <ActionModal closeModal={() => setIsModalVisible(false)} />
                        </View>
                    )}
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>FieldA</Text>
                        <TextInput
                            style={styles.inputField}
                            onChangeText={text => handleChange(text, actions.FIELDA_CHANGED)}
                            value={state[actions.FIELDA_CHANGED]}
                            placeholder="Insert text..."
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>FieldB</Text>
                        <TextInput
                            style={styles.inputField}
                            onChangeText={text => handleChange(text, actions.FIELDB_CHANGED)}
                            value={state[actions.FIELDB_CHANGED]}
                            placeholder="Insert text..."
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>FieldC</Text>
                        <TextInput
                            style={styles.inputField}
                            onChangeText={text => handleChange(text, actions.FIELDC_CHANGED)}
                            value={state[actions.FIELDC_CHANGED]}
                            placeholder="Insert text..."
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>FieldD</Text>
                        <TextInput
                            style={styles.inputField}
                            onChangeText={text => handleChange(text, actions.FIELDD_CHANGED)}
                            value={state[actions.FIELDD_CHANGED]}
                            placeholder="Insert text..."
                        />
                    </View>
                    <TouchableOpacity style={styles.buttonContainer} onPressIn={handleSave}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
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
    modalContainer: {
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 1000,
        position: 'absolute',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        padding: 20,
    },
    inputLabel: {
        color: 'rgb(0,122,255)',
        marginBottom: 12,
    },
    inputField: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        padding: 5,

    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 20,
    },
    buttonText: {
        backgroundColor: 'rgba(0, 122, 255, 0.12)',
        color: 'rgb(0, 122, 255)',
        padding: 15,
        borderRadius: 8,
    },
    title: {
        textAlign: 'center',
        color: 'rgb(0, 122, 255)',
    },
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

