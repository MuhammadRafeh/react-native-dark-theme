import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './RootNavigator';

export default function Navigator() {
    return ( 
        <NavigationContainer>
            <RootNavigator />
        </NavigationContainer>
    );
}