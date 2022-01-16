import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { useAppContext } from '../../contexts/ContextProvider';

const View = props => {
    const { isDarkMode } = useAppContext();
    const color = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        console.log(isDarkMode, 'aaaa');
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
        outputRange: ['rgb(0, 0, 0)', 'rgb(255, 255, 255)']
    });

    const animatedStyle = {
        backgroundColor: interpolateColor
    }

    return (
        <Animated.View style={[props.style, animatedStyle]}>
            {props.children}
        </Animated.View>
    )
};

export default View;
