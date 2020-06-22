// modules
import * as React from 'react';
import { View, Text } from 'react-native';
import { useQuery } from '@apollo/client';

// graphql
import { GET_DAG_RAPPORT_BY_DATE } from '../../../../../graphql/queries/dag-rapport';

export default function VandaagDagRapport() {

    //queries
    // const { loading, error, data } = useQuery(GET_DAG_RAPPORT_BY_DATE, {
    //     variables: {
    //         date: new Date()
    //     }
    // })
    // console.log('data', data)
    // React.useEffect(() => {
    //     if (data) {
    //         console.log('data', data)
    //     }
    // }, [])

    // if (loading) return null;
    // if (error) return null;

    return (
        <View>
            <Text>Vandaag dag rapport</Text>
        </View>
    )
}