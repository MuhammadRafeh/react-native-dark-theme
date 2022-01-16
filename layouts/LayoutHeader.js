import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import FeatherIcon from '../components/Icons/FeatherIcon';
import { COLORS } from '../constants/colors';
import Text from '../components/UiComponents/Text';
import View from '../components/UiComponents/View';

export default function LayoutHeader(props) {

    const [title, setTitle] = useState("");
    const [backButton, setBackButton] = useState(false);
    const [children, setChildren] = useState({});
    const [modal, setModal] = useState(false);

    useEffect(() => {
        setTitle(props.title);
        setBackButton(props.backButton);
        setModal(props.modal);
        setChildren(props.children);
    }, [props]);

    return (
        <View header style={(props.modal !== undefined && props.modal) ? styles.topContainerModal : styles.topContainer}>
            {(props.backButton !== undefined && props.backButton) ?
                <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.backButton}>
                    <View header>
                        <FeatherIcon name="arrow-left" size={30} color={COLORS.fontColor} />
                    </View>
                </TouchableOpacity>
                : null

            }
            <Text style={(props.modal !== undefined && props.modal) ? styles.textTitleModal : styles.textTitle}>{props.title}</Text>
            {props.children}
        </View>
    );
}

const styles = StyleSheet.create({
    topContainer: {
        padding: 30,
        flex: 0,
        alignContent: 'flex-start',
        width: '100%',
        elevation: 10,
        backgroundColor: COLORS.white,
    },
    topContainerModal: {
        padding: 10,
        flex: 0,
        alignContent: 'flex-start',
        width: '100%',
        elevation: 10,
        backgroundColor: COLORS.white,
    },
    textTitle: {
        color: COLORS.fontColor,
        textAlign: 'center',
        fontSize: 24,
        marginTop: (Platform.OS === 'ios' ? 50 : 30),
        marginBottom: 10,
    },
    textTitleModal: {
        color: COLORS.fontColor,
        textAlign: 'center',
        fontSize: 24,
        marginTop: (Platform.OS === 'ios' ? 30 : 10),
        marginBottom: 10,
    },
    backButton:{
        position: 'absolute',
        top: (Platform.OS === 'ios' ? 60 : 40),
        left: 20,
        width: 40,
        height: 40,
        zIndex: 5
    },
   
});
