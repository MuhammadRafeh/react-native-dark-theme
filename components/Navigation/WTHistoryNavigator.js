
import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';

import WTMonth from '../WorkTime/WTMonth';
import WTDay from '../WorkTime/WTDay';

const Stack = createNativeStackNavigator();

export default function WTHistoryNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Month" component={WTMonth} options={{ title: 'Zeit Aufzeichnung', headerShown:false }} />
            <Stack.Screen name="Day" component={WTDay} options={{ title: 'Tag', headerShown:false }} />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        elevation: 10,
        shadowColor: '#00f',
    },
});