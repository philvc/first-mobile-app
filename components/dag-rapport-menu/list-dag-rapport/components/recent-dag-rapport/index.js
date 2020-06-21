// modules
import * as React from 'react';
import { useQuery } from '@apollo/client';

// graphql
import { GET_DAG_RAPPORT_BY_DATE } from '../../../../../graphql/queries/dag-rapport';

export default function RecentDagRapport() {

    // queries
    const { loading, error, data } = useQuery(GET_DAG_RAPPORT_BY_DATE, {
        variables: {
            date: new Date()
        }
    })

    // React.useEffect(() => {
    //     if (data) {
    //         console.log('data', data)
    //     }
    // }, [])

    if (loading) return null;
    if (error) return null;

    return (
        <View>
            <Text>Most recent dag rapport</Text>
        </View>
    )
}