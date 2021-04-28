import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Home_screen from './navigation/home_screen.js'
import Routes from './navigation/routes.js';


//import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default class App extends React.Component {
    render() {
        return (
           <Home_screen/>
           // <Routes />

        )
    }
}

//<NavigationContainer>
//    <Tab.Navigator
//        screenOptions={({ route }) => ({
//            tabBarIcon: ({ focused, color, size }) => {
//                let iconName;

//                if (route.name === 'Calendar') {
//                    iconName = focused
//                        ? 'ios-calendar' : 'ios-calendar';
//                } else if (route.name === 'Search') {
//                    iconName = focused ? 'ios-search' : 'ios-search';
//                }
//                else if (route.name === 'Chat') {
//                    iconName = focused ? 'ios-send' : 'ios-send';
//                }
//                else if (route.name === 'Profil') {
//                    iconName = focused ? 'ios-contact' : 'ios-contact';
//                }

//                // You can return any component that you like here!
//                return <Ionicons name={iconName} size={30} color={color} />;
//            },
//        })}
//        tabBarOptions={{
//            activeTintColor: 'red',
//            inactiveTintColor: 'gray',
//        }}>
//        <Tab.Screen name="Calendar" component={Calendar} />
//        <Tab.Screen name="Search" component={Search} />
//        <Tab.Screen name="Chat" component={Chat} />
//        <Tab.Screen name="Profil" component={Profil} />
//    </Tab.Navigator>
//</NavigationContainer>
//        )
//    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
