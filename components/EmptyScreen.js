import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function EmptyScreen({ navigation }) {
   
    return (
        <View style={styles.container}>
            
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    
});
