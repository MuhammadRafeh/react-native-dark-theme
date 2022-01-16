import React, { useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { COLORS } from '../constants/colors';

export default function LayoutBody(props) {
    const scrollViewRef = useRef();

    return (
        <View style={styles.body}>
            <ScrollView style={StyleSheet.absoluteFill} ref={scrollViewRef}
            onContentSizeChange={() => {
                if (props.scrollToEnd != 'undefined' && props.scrollToEnd == true)
                {
                    scrollViewRef.current.scrollToEnd({ animated: true })
                }}}>
            {props.children}
            </ScrollView>
        </View>
    );
}



const styles = StyleSheet.create({
    body: {
        width: '100%',
        flex: 1,
        backgroundColor: COLORS.bodyBackground,
        elevation: 5
    },
});
