// JavaScript source code
import React from 'react'
import { Alert, Button, StyleSheet, View, Image, TextInput, Text, Linking } from 'react-native'
import GradientButton from 'react-native-gradient-buttons'
import { Actions } from 'react-native-router-flux';


class Login extends React.Component {

    constructor(props) {
 
    super(props)
 
    this.state = {
 
      UserEmail: '',
      UserPassword: ''
 
    }
  }
    UserLoginFunction = () => {
        const { UserEmail } = this.state;
        const { UserPassword } = this.state;


        fetch('http://192.168.17.1/test/User_Login.php', {
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
                if (responseJson === 'Data Matched') {
                    //Then open Profile activity and send user email to profile activity.
                    Actions.home()
                }
                else {

                    Alert.alert("Identifiant ou mot de passe incorrect");
                }

            }).catch((error) => {
                console.error(error);
            });

    }

    goTosignup() {
        Actions.signup()
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'lightskyblue' }}>
                <View style={styles.container}>
                    <Image style={styles.logo} source={require('../pictures/logo.png')} />
                </View>
                <View style={{margin: 15}}>
                    <TextInput style={styles.input} onChangeText={UserEmail => this.setState({ UserEmail })} placeholder=' adresse mail' />
                    <TextInput style={styles.input} onChangeText={UserPassword => this.setState({ UserPassword })} placeholder=' Mot de passe' />
                </View>
                <View style={styles.button}>


                    <Button
                        onPress={this.UserLoginFunction}
                        title="Se connecter"
                        color="#841584"
                        accessibilityLabel="Learn more about this purple button"
                    />


                    <Text style={{
                        marginTop: 10
                        , marginBottom: 30
                    }} onPress={this.goTosignup} >Creer un compte</Text>
                </View >
            </View >
        )
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        marginTop: 15,
        alignItems: 'center',
        backgroundColor: 'lightskyblue',
    },

    logo: {
        flex: 1,
        width: 180,
        resizeMode: 'contain',
    },

    input: {

        margin: 15,
        height: 50,
        borderRadius: 20,
        backgroundColor: 'mintcream',
    },

    button: {
        flex: 1,
        marginTop: 15,
        marginRight: 20,
        marginLeft: 20,
        alignItems: 'center',

    },
})
export default Login;
