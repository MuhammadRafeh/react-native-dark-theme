import React from 'react';
import { StyleSheet, View } from 'react-native';
import { COLORS } from '../constants/colors';

export default function LayoutMain(props) {

    return (

        <View style={styles.container}>
                {props.children}
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
});
