import React, { useMemo } from 'react';
import { StyleSheet, View, Text, Animated, Dimensions, Image } from 'react-native';
import { Video } from "expo-av";

import { COLORS } from '../constants/colors';
import PillButton from './UiComponents/PillButton';


export default function Welcome({ navigation }) {
    const opacity = useMemo(() => new Animated.Value(0), []);

    const nextScreen = () => navigation.navigate('QrScanner');
    return (
        <View style={styles.container}>
            <View style={StyleSheet.absoluteFill}>
                <Animated.View
                    style={[styles.backgroundViewWrapper, { opacity: opacity }]}
                >
                    <Video
                        isLooping
                        isMuted
                        positionMillis={0}
                        onLoad={() => {
                            Animated.timing(opacity, {
                                toValue: 0.6,
                                useNativeDriver: true,
                            }).start();
                        }}
                        resizeMode="cover"
                        shouldPlay
                        source={{
                            uri: "https://ems.vl6.spal.at/assets/startscreen.mp4",
                        }}
                        style={{ flex: 1 }}
                    />
                </Animated.View>

                <View style={styles.wScreenTopContainer}>
                    <View style={styles.wScreenSubView}>
                        <Image source={require('../assets/images/start-logo.png')} style={styles.logo} />
                    </View>
                    <View style={styles.wScreenSubView}>
                        <Text style={styles.textTitle}>AmPm</Text>
                        <Text style={styles.textCenter}>Arbeitszeiterfassung einfach gemacht.</Text>
                    </View>

                    <View style={styles.wScreenSubView}>

                        <PillButton title="Anmelden" size="lg" color="white" bgcolor="white" border="3" type="outline" buttonprops={{
                            onPress: nextScreen
                        }} />
                        
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#000000'
    },
    contentContainer: {
        padding: 30
    },
    textCenter: {
        fontSize: 16,
        color: "#ffffff",
        textAlign: 'center'
    },
    wScreenTopContainer: {
        padding: 30,
        flex: 1,
        width: '100%',
        elevation: 10,
        marginTop: 50
    },
    textTitle: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 24,
        marginTop: 20,
        marginBottom: 20
    },
    wScreenSubView: {
        flex: 1,
        alignContent: 'center'
    },
    backgroundViewWrapper: {
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
        position: "absolute",
        top: 0,
        left: 0,
        alignItems: "stretch",
        bottom: 0,
        right: 0,
        backgroundColor: '#000000'
    },
    logo: {
        width: 150,
        height: 150,
        alignSelf: 'center',

    }

});
