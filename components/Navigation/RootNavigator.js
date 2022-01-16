import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppNavigator from './AppNavigator';
import AuthService from '../../services/AuthService';
import AppContextService from '../../services/AppContextService';
import UnauthNavigator from './UnauthNavigator';

const Stack = createNativeStackNavigator();


export default function RootNavigator() {

    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        isLoggedIn: action.isLoggedIn,
                        isLoading: false,
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        isLoggedIn: action.isLoggedIn,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        isLoggedIn: false,
                    };
            }
        },
        {
            isLoading: true,
            isSignout: false,
            isLoggedIn: false,
        }
    );

    React.useEffect(() => {
        const bootstrapAsync = async () => {
            let isLoggedIn;
            try {
                isLoggedIn = await AuthService.isAuthentificated();
            } catch (e) {
            }
            dispatch({ type: 'RESTORE_TOKEN', isLoggedIn: isLoggedIn });
        };

        bootstrapAsync();
    }, []);

    const authContext = React.useMemo(
        () => ({
            signIn: async data => {
                dispatch({ type: 'SIGN_IN', isLoggedIn: true });
            },
            signOut: async() => {
                
                dispatch({ type: 'SIGN_OUT', isLoggedIn: false })
            },
        }),
        []
    );
    return (
        <AppContextService.Provider value={authContext}>
            <Stack.Navigator style={{
                flex: 1,
                backgroundColor: '#fff',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
            }}
            screenOptions={({ route }) => ({
                headerShown: false
            })}
            >
                {state.isLoggedIn == false ? (
                    <Stack.Screen name="UnauthNavigator" component={UnauthNavigator} options={{ headerShown: false }} />
                ) : (
                    <Stack.Screen name="AppNavigator" component={AppNavigator} options={{ headerShown: false }} />
                )}

            </Stack.Navigator>
        </AppContextService.Provider>

    );
}