import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { createAppContainer } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import Map from './map.js';
import List from './list.js';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


function SettingsScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings!</Text>
        </View>
    );
}

const Tab = createMaterialTopTabNavigator();

class Search extends React.Component {
    constructor(props) {
        global.longitude = -0.551752;
        global.latitude = 47.471172;
        super(props);
    }

    render() {
        return (
            <View style={{ flex: 1, marginTop: 40 }}>
                <Tab.Navigator>
                    <Tab.Screen name="Carte" component={Map} />
                    <Tab.Screen name="Liste" component={List} />
                </Tab.Navigator>
            </View>
        );
    }
}
export default Search;
