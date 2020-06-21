
// modules
import * as React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Button } from 'react-native';

export default function DatePicker() {

    // state
    const [show, setShow] = React.useState(false)
    const [mode, setMode] = React.useState('date')
    const [date, setDate] = React.useState(new Date())

    //handlers
    function showTimePicker() {
        setShow(prevValue => !prevValue)
    }

    function selectDate(event, selectDate) {
        console.log('event & selectDate', event, selectDate)
        const currentDate = selectedDate || date;
        setDate(currentDate);
    }

    function findDagRapport() {
        console.log('findDagRapport')
    }

    console.log('show', show)
    console.log('date', date)
    return (
        <View>
            <Button title="select dag rapport" onPress={showTimePicker} />
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
        </View>
    )
}