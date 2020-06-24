// modules
import * as React from 'react';
import { View, StyleSheet, Button, Text, TouchableOpacity } from 'react-native';

export default function Header({ navigation }: any) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={navigation.openDrawer}>
                <Text style={styles.text}>Drawer menu</Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        height: '10%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'rgb(0, 122, 255)'
    }
});
