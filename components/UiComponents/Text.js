import React from 'react';
import { Text as DefaultText } from 'react-native';

const Text = props => (
    <DefaultText style={props.style}>
        {props.children}
    </DefaultText>
);

export default Text;
