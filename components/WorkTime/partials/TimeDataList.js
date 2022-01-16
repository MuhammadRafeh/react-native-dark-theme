import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../../constants/colors';

// Liste Kommen/Gehen des uebergebenen Tages
export default function TimeDataList(props) {
    const [dayData, setDayData] = useState({});

    useEffect(() => {
        setDayData(props.data);
    }, [props]);

    function renderListItems() {
        if (Object.keys(dayData).length <= 0)
            return null;
        return dayData.timesData.map((item) =>
            <View key={item.id} style={styles.container}>
                <View style={{ flexDirection: 'row', flex: 4, alignItems:'center' }}>
                    <View style={item.type == 1 ? styles.circle : [styles.circle, { backgroundColor: COLORS.danger }]} />
                    <Text style={styles.textLeft}>{item.type == 1 ? 'Kommen' : 'Gehen'}</Text>
                </View>
                <View style={styles.textRightView}><Text style={styles.textRight}>{item.timeReadable}</Text></View>
            </View>
        );
    }

    return <View>
        {renderListItems()}
    </View>
}

// Styles
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: COLORS.listBorder,
        borderBottomWidth: 1,
    },
    circle: {
        width: 25,
        height: 25,
        borderRadius: 25 / 2,
        backgroundColor: COLORS.success,
        margin: 25,
    },

    textLeft: {
        color: COLORS.fontColor,
        textAlignVertical: 'center',
        fontSize: 18,
    },
    textRight: {
        color: COLORS.fontColor,
        textAlignVertical: 'center',
        fontSize: 18,
    },
    textRightView: {
        flex: 1,
        alignSelf: 'center',
        borderWidth: 0,
    },
});

