import React, { useRef } from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../constants/colors';
import FeatherIcon from '../Icons/FeatherIcon';

export default function PillButton(props) {

    const defaultButtonLg = {
        alignSelf: 'center',
        width: 250,
        padding: 30,
        borderRadius: 250 / 2,
        backgroundColor: 'transparent',
        alignSelf: 'center',
    }
    const defaultButtonMd = {
        alignSelf: 'center',
        width: 200,
        padding: 12,
        borderRadius: 50,
        alignItems: 'center',
    }

    const defaultButtonClose = {
        hight: 35,
        width: 35,
        borderRadius: 20,
        alignItems: 'center',
        position: 'absolute',
        zIndex: 5,
        alignSelf: 'flex-end',
        top: 10,
        right: 10
    }


    const colors = {
        white: COLORS.white,
        success: COLORS.success,
        danger: COLORS.danger,
        warning: COLORS.warning
    }

    const buttonStyle = () => {

        let localButton = props.size == 'lg' ? { ...defaultButtonLg } : props.size == 'close' ? { ...defaultButtonClose } : {...defaultButtonMd};

        let BgBbColor = colors[props.bgcolor];

        if (props.type !== null && props.type == 'outline') {
            localButton.backgroundColor = 'transparent';
            localButton.borderColor = BgBbColor;
            localButton.borderWidth = parseInt(props.border);
        } else {
            localButton.backgroundColor = BgBbColor;
        }

        return localButton;
    }
    const buttonText = () => {
        return {
            textAlign: 'center',
            fontSize: props.size == 'lg' ? 24 : 16,
            color: colors[props.color]
        }
    }

    return (
        <TouchableOpacity {...props.buttonprops} style={props.btnstyle !== undefined ? [buttonStyle(), props.btnstyle] : buttonStyle()}>
            {(props.size == 'close') 
            ? <View style={{height: 35, width: 35, padding: 1, alignItems:'center'}}><FeatherIcon name="x" size={30} color={COLORS.white} /></View>
            : <Text style={props.textstyle !== undefined ? [buttonText(), props.textstyle] : buttonText()}>{props.title}</Text>
            }
        </TouchableOpacity>
    );
}



