import React from 'react'

import Search from '../components/Search/Search_index.js';
import Profile from '../components/profile.js';
import Chat from '../components/chat.js';
import Calendar from '../components/calendar.js';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

class Home_screen extends React.Component {

    frite() {
        alert('frite')
    }

    constructor(props) {

        super(props);
        global.id='yo'
    }

    render() {
        return (
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;

                            if (route.name === 'Calendar') {
                                iconName = focused
                                    ? 'ios-calendar' : 'ios-calendar';
                            } else if (route.name === 'Search') {
                                iconName = focused ? 'ios-search' : 'ios-search';
                            }
                            else if (route.name === 'Chat') {
                                iconName = focused ? 'ios-send' : 'ios-send';
                            }
                            else if (route.name === 'Profile') {
                                iconName = focused ? 'ios-contact' : 'ios-contact';
                            }

                            // You can return any component that you like here!
                            return <Ionicons name={iconName} size={30} color={color} />;
                        },
                    })}
                    tabBarOptions={{
                        activeTintColor: 'red',
                        inactiveTintColor: 'gray',
                    }}>
                    <Tab.Screen name="Search" component={Search} />
                    <Tab.Screen name="Calendar" component={Calendar} />
                    <Tab.Screen name="Chat" component={Chat} />
                    <Tab.Screen name="Profile" component={Profile} />
                </Tab.Navigator>
            </NavigationContainer>

        )
    }
} export default Home_screen;