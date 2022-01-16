import React from 'react';
import { StyleSheet, View, Modal } from 'react-native';
import { COLORS } from '../constants/colors';
import PillButton from '../components/UiComponents/PillButton';

export default function LayoutModal(props) {
    return (
        <Modal visible={props.open} transparent={true} onRequestClose={props.onClose} animationType='slide'>
                <View style={styles.container}>
                    <PillButton title="X" size="close" color="white" bgcolor="danger" btnstyle={{ zIndex: 5, elevation: 5 }} buttonprops={{
                                onPress: props.onClose}} />
                    <View style={styles.innerContainer}>
                        {props.children} 
                    </View>
                </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        marginTop: 20,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: 'hidden',
        alignItems: 'center',
        elevation: 10,
        zIndex: 0
    },
    innerContainer: {
        height: '100%',
        width: '100%',
        zIndex: 0
    },
});
