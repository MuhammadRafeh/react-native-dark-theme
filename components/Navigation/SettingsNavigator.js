
import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';

import WTDash from '../WorkTime/WTDash';
import WTMonth from '../WorkTime/WTMonth';
import WTDay from '../WorkTime/WTDay';
import SettingsMain from '../Settings/SettingsMain';
import FeatherIcon from '../Icons/FeatherIcon';
import QrScanner from '../QrScanner/QrScanner';

const Stack = createNativeStackNavigator();

export default function SettingsNavigator() {
    const headerBackTitle = "Zurück";

    return (

        <Stack.Navigator>
            <Stack.Screen name="SettingsMain" component={SettingsMain} options={{ title: 'Zeit Aufzeichnung', headerShown:false }} />
            <Stack.Screen name="SettingsQrScanner" component={QrScanner} options={{ title: 'Tag', headerShown:false }} />
        </Stack.Navigator>

    );
}



const styles = StyleSheet.create({
    container: {
        elevation: 10,
        shadowColor: '#00f',
    },
});