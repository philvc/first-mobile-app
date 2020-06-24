// modules
import * as React from 'react';
import { useMutation } from '@apollo/client';
import { View, Button, Text, StyleSheet } from 'react-native';

// graphql
import { CREATE_DAG_RAPPORT } from '../../../../../graphql/mutations/dag-rapport'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { format } from 'date-fns';

export default function CreateDagRapportButton({ navigation }: any) {

    // mutations
    const [createDagRapport] = useMutation(CREATE_DAG_RAPPORT, {
        onCompleted({ createDagRapport }) {
            navigation.navigate('Write', { item: createDagRapport })
        }
    })

    // handlers
    function handleClick() {
        createDagRapport({
            variables: {
                date: format(new Date(), 'MMM-dd-yyyy')
            }
        })
    }
    return (
        <View>
            <TouchableOpacity style={styles.vandaagButtonContainer} onPress={handleClick}>
                <Text style={styles.vandaagButtonText}>Vandaag</Text>
            </TouchableOpacity>
            {/* <Button title='Create new dag rapport' onPress={handleClick} /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    vandaagButtonContainer: {
        alignItems: 'center',
        display: 'flex',
        marginTop: 30,
        marginBottom: 20,
    },
    vandaagButtonText: {
        backgroundColor: 'rgba(0, 122, 255, 0.12)',
        color: 'rgb(0, 122, 255)',
        padding: 15,
        borderRadius: 8,
    },
})