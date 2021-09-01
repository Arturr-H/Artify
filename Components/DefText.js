import React from 'react';
import { Text } from 'react-native';

const DefText = (props) => {

    return(
        <Text numberOfLines={2} adjustsFontSizeToFit style={props.style}>
            {props.text}
        </Text>
    );
}
export default DefText;