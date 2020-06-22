// modules
import * as React from 'react';
import { View, StyleSheet, Button } from 'react-native';

export default function Header({ navigation }: any) {
    return (
        <View style={styles.container}>
            <Button title='Menu' onPress={navigation.openDrawer} />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        height: '10%',
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
});