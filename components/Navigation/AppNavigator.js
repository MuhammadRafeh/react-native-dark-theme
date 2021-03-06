import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';

import WTDash from '../WorkTime/WTDash';
import FeatherIcon from '../Icons/FeatherIcon';
import WTHistoryNavigator from './WTHistoryNavigator';
import SettingsNavigator from './SettingsNavigator';
import { COLORS } from '../../constants/colors';
import mapTest from '../WorkTime/MapTest';
import { useAppContext } from '../../contexts/ContextProvider';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
    const { isDarkMode } = useAppContext();

    return (

        <Tab.Navigator sceneContainerStyle={styles.container} screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size, focused }) => {
                const icons = {
                    Dash: 'clock',
                    WTHistory: 'rotate-ccw',
                    Settings: 'settings',
                    maptest: 'map-pin'
                };
                return (
                    <FeatherIcon name={icons[route.name]} size={size} color={focused ? COLORS.success : COLORS.fontColor} />
                );
            },

            headerShown: false,
            tabBarInactiveTintColor: isDarkMode ? 'white' : COLORS.fontColor,
            tabBarActiveTintColor: COLORS.success,
            tabBarStyle: {
                elevation: 10,
                backgroundColor: isDarkMode ? 'black' : 'white',
                borderTopColor: isDarkMode ? '#2d2d2e' : '#e1e3e6',
                shadowColor: isDarkMode ? 'white' : 'black'
            },

        })}
        >
            <Tab.Screen name="Dash" component={WTDash} options={{ title: 'Zeit erfassen', headerShown: false }} />
            <Tab.Screen name="WTHistory" component={WTHistoryNavigator} options={{ title: 'Zeit Aufzeichnung', headerShown: false }} />
            <Tab.Screen name="Settings" component={SettingsNavigator} options={{ title: 'Einstellungen' }} />
            <Tab.Screen name="maptest" component={mapTest} options={{ title: 'maptest' }} />

        </Tab.Navigator>

    );
}

const styles = StyleSheet.create({
    container: {
        elevation: 10,
        shadowColor: '#00f',
    },
});