import React, { useEffect, useState } from 'react';
import WorkTimeService from '../../../services/WorkTimeService';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { COLORS } from '../../../constants/colors';
import Text from '../../UiComponents/Text';

// Liste Kommen/Gehen des uebergebenen Tages
export default function MonthDataList(props) {

    const [monthData, setMonthData] = useState([]);

    const dateSelected = (item) => {

        if (item.no_data)
            return;
        props.navigation.navigate('Day', { date: item.day.defaultString() });

    }

    function getMonthData(date = null) {
        WorkTimeService.getMonthData(date).then(d => setMonthData(d)).catch(e => console.log(e));
    }

    useEffect(() => {
        getMonthData(props.date);
    }, [props.date]);

    function renderListItems() {
        if (monthData.length <= 0)
            return null;
        return monthData.map((item) =>
            <TouchableOpacity key={item.id} style={styles.container}
                onPress={() => dateSelected(item)}>
                <View style={{ flexDirection: 'row', flex: 5 }}>
                    <Text style={styles.textLeft}>{item.day.weekday()}, {item.day.readable()}</Text>
                    <Text style={styles.textMiddle}>{item.has_public_holiday ? 'Feiertag' : item.has_vacation ? 'Urlaub' : ''}</Text>
                    <Text style={{ ...styles.textRight, color: item.diff == 0 ? COLORS.fontColor : !item.is_negative ? COLORS.success : COLORS.danger }}>
                        {item.diffReadable}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    return <View style={{ paddingTop: 10, paddingBottom: 10 }}>
        {renderListItems()}
    </View>
}

// Styles
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: COLORS.listBorder,
        borderBottomWidth: 0,
        padding: 10,
    },
    textLeft: {
        color: COLORS.fontColor,
        textAlignVertical: 'center',
        textAlign: 'left',
        fontSize: 18,
        flex: 2,
        marginLeft: 15,
    },
    textMiddle: {
        color: COLORS.warning,
        textAlignVertical: 'center',
        textAlign: 'center',
        fontSize: 18,
        flex: 2
    },
    textRight: {
        color: COLORS.fontColor,
        textAlignVertical: 'center',
        textAlign: 'right',
        fontSize: 18,
        flex: 1,
        marginRight: 15,
    },
    textRightView: {
        flex: 1,
        alignSelf: 'center',
        borderWidth: 0,
    },
});

