import React, { useEffect, useRef } from 'react';
import Animated, { useSharedValue, withTiming, useAnimatedStyle, interpolateColor } from 'react-native-reanimated';
import { useAppContext } from '../../contexts/ContextProvider';

const View = props => {
    const { isDarkMode } = useAppContext();
    const color = useSharedValue(0);

    useEffect(() => {
        console.log(isDarkMode, 'aaaa');
        if (isDarkMode) {
            color.value = withTiming(1, { duration: 220 })
        } else {
            color.value = withTiming(0, { duration: 220 })
        }

    }, [isDarkMode])

    const backColor = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            color.value,
            [0, 1],
            ['white', 'black']
        );

        return {
            backgroundColor,
        };
    });

    return (
        <Animated.View {...props} style={[props.style, backColor, { shadowColor: props.header ? isDarkMode ? 'white' : 'black' : undefined }]}>
            {props.children}
        </Animated.View>
    )
};

export default View;
