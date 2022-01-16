import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Switch } from 'react-native';
import { COLORS } from '../../constants/colors';
import { useAppContext } from '../../contexts/ContextProvider';
import LayoutBody from '../../layouts/LayoutBody';
import LayoutHeader from '../../layouts/LayoutHeader';
import LayoutMain from '../../layouts/LayoutMain';
import AppContextService from '../../services/AppContextService';
import UserService from '../../services/UserService';
import PillButton from '../UiComponents/PillButton';
import Text from '../UiComponents/Text';

export default function SettingsMain({ navigation }) {
    const [userData, setUData] = useState({});

    const { signIn, signOut } = useContext(AppContextService);

    const { isDarkMode, setIsDarkMode } = useAppContext();

    const logout = async () => {
        signOut();
    }

    const scanqr = async () => {
        UserService.resetUserData();
        navigation.navigate('SettingsQrScanner');
    }

    const handleDarkModeSwitch = () => {
        setIsDarkMode(!isDarkMode);
    }

    useEffect(() => {
        UserService.getUserData().then(d => setUData(d)).catch(e => null);
    }, [navigation]);

    return (
        <LayoutMain>
            <LayoutHeader title="Einstellungen" />
            <LayoutBody>
                <View style={styles.contentContainer} >
                    <View style={{ marginBottom: 40 }}>
                        <Text style={styles.textCenter}>Profil: {userData.name}</Text>
                    </View>
                    <View stlye={styles.actionButtonsHolder} >
                        <PillButton title="QR Code scannen" size="md" color="white" bgcolor="success" btnstyle={{ marginBottom: 20 }} buttonprops={{
                            onPress: scanqr
                        }} />
                        <PillButton title="Ausloggen" size="md" color="white" bgcolor="danger" btnstyle={{ marginBottom: 20 }} buttonprops={{
                            onPress: logout
                        }} />
                    </View>
                    <View style={styles.switch}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ ...styles.textCenter, marginLeft: 20 }}>Dark Mode:</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Switch
                                trackColor={{
                                    true: 'grey',
                                    false: '#c2d1c6'
                                }}
                                thumbColor={isDarkMode ? '#444a46' : '#adbab1'}
                                value={isDarkMode}
                                onValueChange={handleDarkModeSwitch} />
                        </View>
                    </View>
                </View>
            </LayoutBody>
        </LayoutMain>
    );
}


const styles = StyleSheet.create({
    textCenter: {
        fontSize: 16,
        color: COLORS.fontColor,
        textAlign: 'center'
    },
    actionButtonsHolder: {
        marginTop: 20
    },
    contentContainer: {
        padding: 20,
        paddingTop: 40,
        paddingBottom: 40,
    },
    switch: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
});
