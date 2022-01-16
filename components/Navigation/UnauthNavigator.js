
import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';

import QrScanner from '../QrScanner/QrScanner';
import Welcome from '../Welcome';

const Stack = createNativeStackNavigator();


export default function UnauthNavigator() {

    return (
        <Stack.Navigator
            screenOptions={({ route }) => ({
                headerShown: false
            })}
        >
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="QrScanner" component={QrScanner} />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        elevation: 10,
        shadowColor: '#00f',
    },
});