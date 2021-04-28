//import * as React from 'react';
import { TouchableOpacity, ImageBackground, StyleSheet, View, Image, TextInput, Text, Linking } from 'react-native'
//import GradientButton from 'react-native-gradient-buttons'
import { Actions } from 'react-native-router-flux';
//import { Root, Popup } from 'popup-ui';
//import ImagePicker from 'react-native-image-picker';
//import Constants from 'expo-constants';
import ImagePicker from './ImagePicker.js';
import React, { useState, useEffect } from 'react';

class Profile extends React.Component {

    goToeditprofil() {
        Actions.editprofil()
    }

    info = {
        first_name: "Jean Michel",
        last_name: "du bledperdu",
        nb_friend: 120,
        mail: "mpasquier.ing2022@esaip.org",
        num_tel: "+33604161359",
        main_badge: "Badges",
        picture: <Image style={styles.logo} source={require('../pictures/logo_test_2.png')} />,
        badge1: <Image style={styles.logo_succes} source={require('../pictures/logo_succes.png')} />,
        badge2: <Image style={styles.logo_succes} source={require('../pictures/logo_succes.png')} />,
        badge3: <Image style={styles.logo_succes} source={require('../pictures/logo_succes.png')} />,
        badge4: <Image style={styles.logo_succes} source={require('../pictures/logo_succes.png')} />,
    }


    render() {
        return (
            <View style={styles.container_main}>
                <View style={styles.container_edit}>
                    <Text style={{
                        textDecorationLine: 'underline',
                    }} onPress={this.goToeditprofil} >Editer profil</Text>
                </View>

                <View style={styles.container_logo_edit}>
                    <ImagePicker />
                </View>

                <View style={styles.container_column_name}>
                    <View style={styles.container_row_name}>
                        <Text style={{
                            marginTop: 15,
                            marginRight: 5,
                            fontSize: 25,
                            textAlign: 'center'
                        }}>{this.info.first_name} {this.info.last_name}
                        </Text>
                    </View>
                    <View style={styles.container_row_friend}>
                        <Text style={{
                            marginTop: 5,
                            marginRight: 5,
                            marginLeft: 20,
                            fontSize: 20,
                        }}>{this.info.nb_friend}
                        </Text>
                        <Text style={{
                            marginTop: 5,
                            marginRight: 20,
                            marginLeft: 5,
                            fontSize: 20,
                        }}>amis
                        </Text>
                    </View>
                </View>

                <View style={styles.container_info}>
                    <View style={styles.container_row}>
                        <View>
                            <Image style={styles.logo_contact} source={require('../pictures/logo_mail.png')} />
                        </View>
                        <Text style={{
                            //marginTop: 12,
                            //marginRight: 5,
                            marginLeft: 20,
                            fontSize: 20,
                            //overflow: 'scroll',
                            //textAlign: 'justify'
                        }}>{this.info.mail}
                        </Text>
                    </View>
                    <View style={styles.container_row}>
                        <View>
                            <Image style={styles.logo_contact} source={require('../pictures/logo_tel.png')} />
                        </View>
                        <Text style={{
                            //marginTop: 12,
                            //marginRight: 5,
                            marginLeft: 20,
                            fontSize: 20,
                        }}>{this.info.num_tel}
                        </Text>
                    </View>
                    <View style={styles.container_row}>
                        <View>
                            <Image style={styles.logo_contact} source={require('../pictures/logo_succes.png')} />
                        </View>
                        <Text style={{
                            //marginTop: 12,
                            //marginRight: 5,
                            marginLeft: 20,
                            fontSize: 20,
                        }}>{this.info.main_badge}
                        </Text>
                    </View>
                </View>

                <View style={styles.container_succes}>
                    <View style={styles.container_logo_succes} >
                        {this.info.badge1}
                    </View>
                    <View style={styles.container_logo_succes} >
                        {this.info.badge1}
                    </View>
                    <View style={styles.container_logo_succes} >
                        {this.info.badge1}
                    </View>
                    <View style={styles.container_logo_succes} >
                        {this.info.badge1}
                    </View>
                </View>
            </View>
        );
    }
} export default Profile;



const styles = StyleSheet.create({

    container_info: {
        flex: 6,

        marginLeft: 30,
        marginRight: 30,

        alignItems: 'flex-start',
        overflow: 'hidden',

        borderColor: "gray",
        borderTopWidth: 5,
        borderBottomWidth: 5,
        borderLeftWidth: 0,
        borderRightWidth: 0,
    },

    container_succes: {
        flex: 3,
        flexDirection: 'row',
        //borderColor: "aqua",
        //borderWidth: 1,
    },

    container_edit: {
        flex: 1,
        alignSelf: 'flex-end',
        marginTop: 30,
        marginRight: 15,
        //borderColor: "fuchsia",
        //borderWidth: 1,
    },

    container_main: {
        flex: 1,
        backgroundColor: 'lightskyblue',
        alignItems: 'center',
    },

    container_logo_edit: {
        flex: 6,
        //borderWidth: 1,
        //borderColor: "gray",
    },

    container_logo: {
        //flex: 1,
        width: 180,
        height: 180,
        borderRadius: 90,
        borderWidth: 5,
        overflow: 'hidden',
        borderColor: "gray",
        alignItems: "center",
    },

    logo: {
        flex: 1,
        resizeMode: 'contain',
    },

    container_logo_succes: {
        //borderColor: "green",
        //borderWidth: 1,
        marginRight: 5,
        marginLeft: 5,
    },

    container_row: {
        flex: 1,
        flexDirection: 'row',
        //justifyContent: 'center',
        alignItems: 'center',
        //borderColor: "aqua",
        //borderWidth: 1,
        //marginLeft: 15,
        //marginRight:15,
        overflow: 'visible'
    },

    container_row_name: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        //flexWrap: 'wrap',
        //justifyContent: 'space-around',
        //borderColor: "aqua",
        //borderWidth: 1,
        overflow: 'visible'
    },

    container_row_friend: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        //flexWrap: 'wrap',
        //justifyContent: 'space-around',
        //borderColor: "aqua",
        //borderWidth: 1,
        overflow: 'visible',
        marginTop: 15,
        marginBottom: 15,
    },

    container_column_name: {
        flex: 3,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginLeft: 15,
        marginRight: 15,
        flexWrap: 'wrap',
        //borderColor: "darkviolet",
        //borderWidth: 1,
    },



    logo_contact: {
        flex: 1,
        width: 30,
        resizeMode: 'contain',
    },

    logo_succes: {
        flex: 1,
        width: 60,
        resizeMode: 'contain',
    },

})


