// JavaScript source code
import React from 'react'
import {Alert, Button, StyleSheet, View, Image, TextInput, Text, Linking, ScrollView, KeyboardAvoidingViewComponent, Keyboard } from 'react-native'
import GradientButton from 'react-native-gradient-buttons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Actions } from 'react-native-router-flux';

class Create_account extends React.Component {

    constructor(props) {

        super(props)

        this.state = {

            UserEmail: '',
            UserPassword: ''

        }

    }
    UserSignupFunction = () => {

        const { UserEmail } = this.state;
        const { UserPassword } = this.state;


        fetch('http://192.168.17.1/test/User_Signup.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                email: UserEmail,

                password: UserPassword

            })

        }).then((response) => response.json())
            .then((responseJson) => {

                // If server response message same as Data Matched
                if (responseJson === 'OK') {

                    //Then open Profile activity and send user email to profile activity.
                    Alert.alert("Compte cree");
                    Actions.home()

                }
                else {

                    Alert.alert("Erreur");
                }

            }).catch((error) => {
                console.error(error);
            });

    }

    goTologin() {
        Actions.login()
    }

    render() {
        return (
            < KeyboardAwareScrollView
                scrollEnabled={true}
                enableAutomaticScroll={true}
                style={{ flex: 2, backgroundColor: 'lightskyblue' }}>

                <View style={{  backgroundColor: 'lightskyblue', marginTop: 30 }}>
                    <View>
                        <TextInput style={styles.input} placeholder='Prenom' />
                        <TextInput style={styles.input} placeholder='Nom' />
                        <TextInput style={styles.input} onChangeText={UserEmail => this.setState({ UserEmail })} placeholder='Adresse mail' />
                        <TextInput style={styles.input} placeholder='Telephone' />
                        <TextInput secureTextEntry={true} onChangeText={UserPassword => this.setState({ UserPassword })} style={styles.input} placeholder='Mot de passe' />
                        <TextInput secureTextEntry={true} style={styles.input} placeholder='Confirmation Mot de passe' />
                    </View>
                    <View style={styles.button}>
                        <Button
                            onPress={this.UserSignupFunction}
                            title="Creer un compte"
                            color="#841584"
                            accessibilityLabel="Learn more about this purple button"
                        />
                        <Text style={{
                            marginTop: 10
                            , marginBottom: 30
                        }} onPress={this.goTologin} >Se connecter</Text>
                    </View >
                </View >

            </KeyboardAwareScrollView>

        )
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 2,
        marginTop: 15,
        alignItems: 'center',
        backgroundColor: 'lightskyblue',
    },


    input: {
        margin: 15,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'mintcream',
        paddingLeft: 15,
        paddingRight: 15,
    },

    button: {

        marginTop: 30,
        marginRight: 20,
        marginLeft: 20,
        alignItems: 'center',

    },
})
export default Create_account;
