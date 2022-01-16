import React, { useState, useEffect } from 'react';
import MonthDataList from './partials/MonthDataList'
import LayoutMain from '../../layouts/LayoutMain';
import LayoutBody from '../../layouts/LayoutBody';
import LayoutHeader from '../../layouts/LayoutHeader';


export default function WTMonth({ navigation }) {
    const [date, setDate] = useState([]);

    function selectDate(dateString) {
        setDate(dateString)
    }
    useEffect(() => {
        selectDate('2021-12-23');
    }, []);

    return (
        <LayoutMain>
            <LayoutHeader title="Arbeitszeiten"></LayoutHeader>
            <LayoutBody>
                    <MonthDataList date={date} navigation={navigation}></MonthDataList>
            </LayoutBody>
        </LayoutMain>

    );
}
