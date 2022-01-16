import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { COLORS } from '../../constants/colors';
import WorkTimeService from '../../services/WorkTimeService';
import TimeDataList from './partials/TimeDataList';
import LayoutMain from '../../layouts/LayoutMain';
import LayoutHeader from '../../layouts/LayoutHeader';
import LayoutBody from '../../layouts/LayoutBody';
import LayoutModal from '../../layouts/LayoutModal';
import PillButton from '../UiComponents/PillButton';
import WTDayComments from './WTDayComments'

export default function WTDay({ route, navigation }) {
    const [timeData, setTimeData] = useState({});
    const [title, setTitle] = useState("");
    const [modalCommentsVisible, setModalCommentsVisible] = useState(false);
    const openComments = () => {setModalCommentsVisible(true)}

    useEffect(() => {
        if (route.params == undefined)
            return;

        const { date } = route.params;
        if (date == undefined)
            return;

        WorkTimeService.getWorkTimeByDay(date).then(d => {
            setTimeData(d.currentDayData);
            setTitle(d.currentDayData.day.readable())
        }).catch(e => console.log(e));
    }, [route]);

    return (
        <View style={styles.centeredView}>
        <LayoutMain>
            {timeData !== undefined ?
                <LayoutHeader backButton={true} navigation={navigation} title={title}>
                    <Text style={styles.textSum}>Summe: {timeData.istReadable} | Soll: {timeData.sollReadable}</Text>

                    <Text style={timeData.is_negative ? [styles.textDiff, { backgroundColor: COLORS.danger }] : styles.textDiff}>
                        {timeData.diffReadable}
                    </Text>
                </LayoutHeader>
                : null
            }

            <LayoutBody>
                <View>
                    <TimeDataList data={timeData}></TimeDataList>
                    <PillButton title="Änderungsantrag" size="md" color="white" bgcolor="warning" btnstyle={{ margin: 10 }} buttonprops={{
                            onPress: openComments
                    }} />
                </View>
            </LayoutBody>
            
        </LayoutMain>
        <LayoutModal open={modalCommentsVisible} 
            onClose={() => setModalCommentsVisible(!modalCommentsVisible)}>
                <WTDayComments data={timeData}></WTDayComments>
        </LayoutModal>
        </View>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textSum: {
        color: COLORS.fontColor,
        textAlignVertical: 'center',
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 20
    },
    textDiff: {
        backgroundColor: COLORS.success,
        color: COLORS.white,
        textAlignVertical: 'center',
        textAlign: 'center',
        fontSize: 48,
        padding: 20
    },
});
