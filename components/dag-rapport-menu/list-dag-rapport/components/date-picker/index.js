
// modules
import * as React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Button, Text, SafeAreaView, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useLazyQuery } from '@apollo/client';
import { format } from 'date-fns';
import Constants from 'expo-constants';


// graphql
import { GET_DAG_RAPPORT_BY_DATE } from '../../../../../graphql/queries/dag-rapport'

export default function DatePicker({ navigation }) {

    // state
    const [show, setShow] = React.useState(false)
    const [mode, setMode] = React.useState('date')
    const [date, setDate] = React.useState(new Date())
    const [formatDate, setFormatDate] = React.useState(format(new Date(), 'MMM-dd-yyyy'))
    const [dagRapportList, setDagRapportList] = React.useState(null)

    // queries
    const [getDagRapportByDate, { loading, error, data }] = useLazyQuery(GET_DAG_RAPPORT_BY_DATE, {
        fetchPolicy: 'no-cache',
    })

    // effects
    React.useEffect(() => {
        if (data) {
            setDagRapportList(data.dagRapportByDate)
        }
        if (error) {
            console.log('lazy query error', error)
        }
    }, [data, error])

    //handlers
    function showTimePicker() {
        setShow(prevValue => !prevValue)
    }

    function selectDate(event, selectDate) {

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

    const onSelect = React.useCallback((item) => {
        navigation.navigate('DagRapport', { item })
    })

    // render functions
    function Item({ date, onSelect }) {
        return (
            <View style={styles.item}>
                <TouchableOpacity onPress={onSelect}>

                    <Text style={styles.date}>Rapport of {date}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View>
            <Button title="Open date picker" onPress={showTimePicker} />
            {show && (
                <View>
                    <DateTimePicker
                        mode={mode}
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={selectDate}
                    />
                    <Button title="Find" onPress={findDagRapport} />
                </View>
            )}
            {dagRapportList && dagRapportList !== null ? (
                <SafeAreaView>
                    <Text>Result</Text>
                    <FlatList
                        data={dagRapportList}
                        renderItem={({ item }) => <Item date={item.date} onSelect={() => onSelect(item)} />}
                        keyExtractor={item => item.id}
                        ListEmptyComponent={() => <Text>No result</Text>}
                    />
                </SafeAreaView>
            ) : (
                    <Text>No rapport found</Text>
                )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    date: {
        fontSize: 32,
    },
});