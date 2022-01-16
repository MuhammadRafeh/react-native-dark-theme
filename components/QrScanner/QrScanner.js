import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet,Text, View, TouchableOpacity, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import ProvisioningServie from '../../services/ProvisioningService';
import FeatherIcon from '../Icons/FeatherIcon';
import AppContextService from '../../services/AppContextService';
import LayoutMain from '../../layouts/LayoutMain';

export default function QrScanner({ route, navigation }) {
    const [hasPermission, setHasPermission] = useState(false);
    const [scanned, setScanned] = useState(false);

    let scanTimeout = undefined;

    const { signIn } = useContext(AppContextService);

    useEffect(() => {
        (async () => {
            setScanned(false);
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    // Wir müssen den Scan Timeout clearen sofern in der Zeischenzeit die View ungemounted wird.
    useEffect(() => {
        setScanned(false);
        if (scanTimeout) {
            clearTimeout(scanTimeout);
        }
    }, []);

    const setScanTimeout = () => {
        scanTimeout = setTimeout(() => setScanned(false), 2000);
    }
    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        ProvisioningServie.fetchToken(data).then(r => {
            signIn();
            if (route.name == 'SettingsQrScanner') {
                navigation.goBack();
            }

        }).catch(function (error) {
            // TODO: Exception Handling 
            console.log(error);
            Alert.alert(
                "QR Code ungültig",
                "Authentifizierung nicht möglich. Der QR Code ist nicht gültig oder kann nicht gelesen werden. Bitte versuchen Sie es erneut oder einen anderen.",
                [
                    { text: "Schließen"}
                ]
            );
            setScanTimeout();
        });

    };


    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
        <LayoutMain>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <View>
                    <FeatherIcon name="chevron-left" size={30} color="#fff" />
                </View>
            </TouchableOpacity>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={styles.camera}
                type={BarCodeScanner.Constants.Type.back}
            >

                <View style={styles.qrFrameContainer}>
                    <Text style={styles.qrFrameText}>QR Code scannen</Text>
                    <View style={styles.qrFrameLT}>
                    </View>
                    <View style={styles.qrFrameRT}>
                    </View>
                    <View style={styles.qrFrameLB}>
                    </View>
                    <View style={styles.qrFrameRB}>
                    </View>
                </View>
                <View style={styles.qrBackDrop}></View>

            </BarCodeScanner>
        </LayoutMain>

    );
}


const styles = StyleSheet.create({

    backButton: {
        position: 'absolute',
        top: 50,
        left: 30,
        width: 40,
        height: 40,
        zIndex: 5
    },
    camera: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    qrBackDrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 2,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },

    qrFrameContainer: {
        flexDirection: 'row',
        alignContent: 'space-between',
        flexWrap: 'wrap',
        width: 300,
        height: 300,
        marginBottom: 100,
        backgroundColor: 'transparent',
        zIndex: 15,
        position: 'relative'
    },
    maskFrameContainer: {
        flexDirection: 'row',
        alignContent: 'space-between',
        flexWrap: 'wrap',
        width: 300,
        height: 300,
        marginBottom: 100,
        backgroundColor: 'white'
    },

    qrFrameText: {
        width: 300,
        textAlign: 'center',
        color: '#ffffff'
    },
    qrFrameLT: {
        borderTopWidth: 5,
        borderLeftWidth: 5,
        borderColor: '#ffffff',
        width: 50,
        height: 50,
        borderTopLeftRadius: 15,
        margin: 50
    },
    qrFrameRT: {
        borderTopWidth: 5,
        borderRightWidth: 5,
        borderColor: '#ffffff',
        width: 50,
        height: 50,
        borderTopRightRadius: 15,
        margin: 50
    },

    qrFrameLB: {
        borderBottomWidth: 5,
        borderLeftWidth: 5,
        borderColor: '#ffffff',
        width: 50,
        height: 50,
        borderBottomLeftRadius: 15,
        margin: 50
    },
    qrFrameRB: {
        borderBottomWidth: 5,
        borderRightWidth: 5,
        borderColor: '#ffffff',
        width: 50,
        height: 50,
        borderBottomRightRadius: 15,
        margin: 50
    }
});
