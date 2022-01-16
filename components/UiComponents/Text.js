import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { COLORS } from '../../constants/colors';
import { useAppContext } from '../../contexts/ContextProvider';

const Text = props => {
    const { isDarkMode } = useAppContext();
    const color = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (props.style.color == COLORS.success || props.style.color == COLORS.danger) {
            return;
        }
        if (isDarkMode) {
            Animated.timing(color, {
                toValue: 0,
                duration: 220,
                useNativeDriver: false,
            }).start();
        } else {
            Animated.timing(color, {
                toValue: 1,
                duration: 220,
                useNativeDriver: false,
            }).start();
        }
    }, [isDarkMode])

    const interpolateColor = color.interpolate({
        inputRange: [0, 1],
        outputRange: ['white', COLORS.fontColor]
    });

    let animatedStyle = {
        color: interpolateColor
    }

    if (props.style.color == COLORS.success || props.style.color == COLORS.danger) {
        animatedStyle = {}
    }

    return (
        <Animated.Text {...props} style={[props.style, animatedStyle]}>
            {props.children}
        </Animated.Text>
    )
};

export default Text;
