import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { COLORS } from '../../constants/colors';
import LayoutBody from '../../layouts/LayoutBody';
import LayoutHeader from '../../layouts/LayoutHeader';
import LayoutMain from '../../layouts/LayoutMain';
import AppContextService from '../../services/AppContextService';
import UserService from '../../services/UserService';
import PillButton from '../UiComponents/PillButton';


export default function SettingsMain({ navigation }) {
    const [userData, setUData] = useState({});

    const { signIn, signOut } = useContext(AppContextService);

    const logout = async () => {
        signOut();
    }
    const scanqr = async () => {
        UserService.resetUserData();
        navigation.navigate('SettingsQrScanner');
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
    }
});
