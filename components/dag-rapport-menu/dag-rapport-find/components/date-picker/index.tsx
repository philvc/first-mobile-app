
// modules
import * as React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Button, Text, SafeAreaView, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useLazyQuery, useApolloClient } from '@apollo/client';
import { format } from 'date-fns';
import Constants from 'expo-constants';


// graphql
import { GET_DAG_RAPPORT_BY_DATE, GET_SELECTED_RAPPORT } from '../../../../../graphql/queries/dag-rapport'

// interface
interface Item {
    id: string;
    fieldA: string;
    fieldB: string;
    fieldC: string;
    fieldD: string;
    date: string;
}

export default function DatePicker({ navigation }: any) {

    //client
    const client = useApolloClient()

    // state
    const [show, setShow] = React.useState(false)
    const [mode, setMode] = React.useState('date')
    const [date, setDate] = React.useState(new Date())
    const [formatDate, setFormatDate] = React.useState(format(new Date(), 'MMM-dd-yyyy'))
    const [dagRapportList, setDagRapportList] = React.useState([])
    const [hasNotFound, setHasNotFound] = React.useState(false)

    console.log('dagRapportList', dagRapportList)
    // queries
    const [getDagRapportByDate, { loading, error, data }] = useLazyQuery(GET_DAG_RAPPORT_BY_DATE, {
        fetchPolicy: 'no-cache',
    })

    // effects
    React.useEffect(() => {
        if (data) {
            console.log('useEffect')
            setDagRapportList(data?.dagRapportByDate)
            if (data?.dagRapportByDate.length === 0) {
                setHasNotFound(prevValue => !prevValue)
            }
        }
        if (error) {
            console.log('lazy query error', error)
        }
    }, [data?.dagRapportByDate, error])

    //handlers
    function showTimePicker() {
        setShow(prevValue => !prevValue)
        setHasNotFound(false)
    }

    function selectDate(event: any, selectDate: any) {

        setDate(selectDate)
        const arrayDate = selectDate.toString().split(' ')
        const formattedDate = `${arrayDate[1]}-${arrayDate[2]}-${arrayDate[3]}`
        setFormatDate(formattedDate)
    }

    function findDagRapport() {

        getDagRapportByDate({
            variables: {
                date: formatDate
            }
        })
    }

    return (
        <View>
            <TouchableOpacity style={styles.pickDateContainer} onPress={showTimePicker}>
                <Text style={styles.pickDateText}>Pick a date</Text>
            </TouchableOpacity>
            {show && (
                <View>
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={"date"}
                        is24Hour={true}
                        display="default"
                        onChange={selectDate}
                    />
                    <TouchableOpacity style={styles.pickDateContainer} onPress={findDagRapport} >
                        <Text style={styles.pickDateText}>Find</Text>
                    </TouchableOpacity>
                </View>
            )}
            {dagRapportList.length > 0 && dagRapportList.map((item: Item) =>
                <ScrollView>
                    <TouchableOpacity
                        style={styles.dagRapportItem}
                        onPress={() => {
                            setShow(false)
                            setDagRapportList([])
                            navigation.navigate('Write', { rapport: item })
                        }}
                        key={item.id}>
                        <Text style={styles.dagRapportDate}>Rapport {item.date}</Text>
                    </TouchableOpacity>
                </ScrollView>
            )}
            {hasNotFound && <Text style={styles.noRapportFound}>Oups, geen rapport gevonden...</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    dagRapportItem: {
        alignItems: 'center',
        padding: 20,
        width: '200',
    },
    dagRapportDate: {
        color: 'rgb(0,122,255)',
    },
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
    pickDateContainer: {
        alignItems: 'center',
        display: 'flex',
        marginTop: 30,
        marginBottom: 20,
    },
    pickDateText: {
        backgroundColor: 'rgba(0, 122, 255, 0.12)',
        color: 'rgb(0, 122, 255)',
        padding: 15,
        borderRadius: 8,
    },
    noRapportFound: {
        textAlign: 'center',
        position: 'absolute',
        top: 300,
        width: '100%',
        color: 'red',
    }
});