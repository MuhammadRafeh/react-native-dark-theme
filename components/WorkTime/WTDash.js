import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { COLORS } from '../../constants/colors';
import WorkTimeService from '../../services/WorkTimeService';
import TimeDataList from './partials/TimeDataList';
import FeatherIcon from '../Icons/FeatherIcon';
import UserService from '../../services/UserService';
import LayoutMain from '../../layouts/LayoutMain';
import LayoutHeader from '../../layouts/LayoutHeader';
import LayoutBody from '../../layouts/LayoutBody';
import PillButton from '../UiComponents/PillButton';


export default function WTDash({ route, navigation }) {

    const [timeData, setTimeData] = useState({});
    const [periodData, setPeriodData] = useState({});
    const [userData, setUserData] = useState({});
    const [WorkState, setWorkState] = useState(false);

    const getCurrentDay = async () => {

        WorkTimeService.getWorkTimeToday().then(d => {
            setTimeData(d.currentDayData);
            setPeriodData(d.currentPeriodData);
            setWorkState(d.currentDayData.lastUnifiedType);

        }).catch(e => console.log(e));
    };

    useEffect(() => {
        getCurrentDay();
        UserService.getUserData().then(d => setUserData(d)).catch(e => null);
    }, [route, navigation]);

    const changeState = async () => {
        await WorkTimeService.setTime().then(d => getCurrentDay()).catch(e => null);
    }
    
    return (
        <LayoutMain>
            <LayoutHeader title={"Hallo " + userData.firstname + "!"}>

                <PillButton title={!WorkState ? "Einstempeln" : "Ausstempeln"} size="lg" color="white" bgcolor={!WorkState ? "success" : "danger"} btnstyle={{ marginBottom: 20, marginTop: 20 }} buttonprops={{
                    onPress: changeState
                }} />

                {periodData !== undefined && (
                    <View style={{ flex: 0, flexDirection: 'row', marginTop: 20 }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <FeatherIcon style={styles.featherIconStyle} name={'clock'} size={25} color={COLORS.fontColor} />
                            <Text style={styles.textOverview}>{periodData.diffReadable}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <FeatherIcon style={styles.featherIconStyle} name={'briefcase'} size={25} color={COLORS.fontColor} />
                            <Text style={styles.textOverview}>{periodData.vacationAmountRest} Tage</Text>
                        </View>
                    </View>
                )}
            </LayoutHeader>
            <LayoutBody>
                <TimeDataList data={timeData}></TimeDataList>
            </LayoutBody>
        </LayoutMain>
    );
}

const styles = StyleSheet.create({

    textOverview: {
        color: COLORS.fontColor,
        textAlignVertical: 'center',
        textAlign: 'left',
        fontSize: 18,
        flex: 1,
        marginLeft: -20
    },
    featherIconStyle: {
        textAlignVertical: 'center',
        textAlign: 'center',
        flex: 1,
    },
});
