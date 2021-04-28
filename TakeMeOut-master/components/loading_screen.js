import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ColorDotsLoader } from 'react-native-indicator';

class Loading_screen extends React.Component {

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ColorDotsLoader size={30} betweenSpace={25} color3='#ffb700' color1='#0c8d15' color2='#740c8d'/>
            </View>
        );
    }
}
//#ffb700
//#0c8d15
//#740c8d
export default Loading_screen;