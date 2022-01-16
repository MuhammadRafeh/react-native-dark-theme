import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants/colors';
import WorkTimeService from '../../services/WorkTimeService';
import LayoutMain from '../../layouts/LayoutMain';
import LayoutHeader from '../../layouts/LayoutHeader';
import LayoutBody from '../../layouts/LayoutBody';
import FeatherIcon from '../Icons/FeatherIcon';
import { ScrollView } from 'react-native-gesture-handler';

export default function WTDayComments( props ) {
    const [day, setDay] = useState({});
    const [dayComments, setDayComments] = useState({});
    const [title, setTitle] = useState("");
    const [text, onChangeText] = React.useState("");
    const getComments = async () => {
        WorkTimeService.getCommentsByDay(day).then(d => {
            setDayComments(d);
            setTitle('Änderungsanträge')
        }).catch(e => console.log(e));
    };
    const sendComment = async () => {
        await WorkTimeService.sendComment(text).then(t => getComments()).catch(e => null);
        onChangeText("");
    }

    useEffect(() => {

        const  data  = props.data;
        if (data == undefined)
            return;
        setDay(data.day);
        getComments();
    }, [props]);

    function renderListItems() {
        if (dayComments.comments == null || Object.keys(dayComments.comments).length <= 0)
            return null;
        return dayComments.comments.map((item) => 
        <View key={item.id} style={[styles.commentStyle, 
            item.author == 'Admin' ? styles.commentAdminStyle : styles.commentUserStyle]}>
            <View style={item.status == 'accepted' 
                ? styles.commentAcceptedStyle : item.status == 'notAccepted' 
                ? styles.commentNotAcceptedStyle : styles.commentPendingStyle}>
                <View style={styles.commentInnerStyle}>
                    <View style={styles.commentTitleStyle}>
                        <Text style={styles.commentAuthorTextStyle}>{item.author}</Text>
                        <View style={styles.commentTitleRightStyle}>
                            <Text style={styles.commentTimeTextStyle}>{item.timeReadable}</Text>
                        </View>
                    </View>
                    <Text style={styles.commentTextStyle}>{item.comment}</Text>
                </View>
            </View>
        </View>
        );
    }

    return (
        <LayoutMain>
            {dayComments !== undefined ?
                <LayoutHeader backButton={false} title={title} modal={true}>
                </LayoutHeader>
                : null
            }
            <View style={styles.containerStyle}>
                { dayComments !== undefined ?
                        <LayoutBody scrollToEnd={true}>
                            <View style={styles.listStyle}>
                                {renderListItems()}
                            </View>
                        </LayoutBody>
                    : null
                }
                <View style={styles.inputStyle}>
                    <View style={styles.inputInnerStyle}>
                        <ScrollView style={{marginRight: 15}}>
                            <TextInput 
                            style={styles.input}
                            onChangeText={onChangeText}
                            value={text}
                            placeholder="Änderung eingeben"
                            keyboardType="default"
                            multiline={true}
                            />
                        </ScrollView>
                    </View>
                    <TouchableOpacity style={styles.sendButton} onPress={() => sendComment()}>
                        <View style={{height: 35, width: 35, padding: 1, alignItems:'center'}}><FeatherIcon name="arrow-right" size={30} color={COLORS.white} /></View>
                    </TouchableOpacity>
                </View>
            </View>
        </LayoutMain>

    );
}

const styles = StyleSheet.create({
    containerStyle: {
        width: '100%',
        flex: 1,
        backgroundColor: COLORS.bodyBackground,
    },
    listStyle: {
        marginTop: 5,
        marginBottom: 5,
        elevation: 5,
    },
    inputStyle: {
        backgroundColor: COLORS.white,
        flexDirection: 'row',
        maxHeight: 96
    },
    inputInnerStyle: {
        backgroundColor: COLORS.bodyBackground,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        borderRadius: 15,
        flex: 1,
        elevation: 5,
    },
    commentStyle: {
        borderRadius: 10,
        overflow: 'hidden',
        flex: 1,
        marginTop: 5,
        marginBottom: 5,
        elevation: 5,
    },
    commentAdminStyle: {
        marginLeft: 10,
        marginRight: 50,
    },
    commentUserStyle: {
        marginLeft: 50,
        marginRight: 10,
    },
    commentAcceptedStyle: {
        backgroundColor: COLORS.success
    },
    commentNotAcceptedStyle: {
        backgroundColor: COLORS.danger
    },
    commentPendingStyle: {
        backgroundColor: COLORS.white
    },
    commentInnerStyle: {
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10,
    },
    commentTitleStyle: {
        flexDirection: 'row', 
        flex: 1, 
        alignItems:'center'
    },
    commentTitleRightStyle: {
        flex: 1,
    },
    commentTextStyle: {
        color: COLORS.fontColor,
        textAlignVertical: 'top',
        textAlign: 'left',
        fontSize: 16,
    },
    commentAuthorTextStyle: {
        color: COLORS.fontColor,
        textAlignVertical: 'top',
        textAlign: 'left',
        fontSize: 16,
        fontWeight: 'bold',
    },
    commentTimeTextStyle: {
        color: COLORS.fontColor,
        textAlignVertical: 'top',
        textAlign: 'right',
        fontSize: 14,
    },
    input: {
        marginTop: 2.5,
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10,
        padding: 0,
        fontSize: 14,
        color: COLORS.fontColor
    },
    sendButton:{
        width: 35,
        height: 35,
        zIndex: 5,
        alignSelf: 'flex-end',
        alignItems: 'center',
        backgroundColor: COLORS.success,
        borderRadius: 20,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        elevation: 5,
    },
});
