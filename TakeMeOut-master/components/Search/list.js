import * as React from 'react';
import { Button, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import SlidingUpPanel from 'rn-sliding-up-panel';


class List extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            markers: []
        }
        { Current_title: '' };
        { Current_description: '' };
        { Current_photo: '' };
        { Current_begin: '' };
        { Current_end: '' };
        { Current_address: '' };
    }

    getData = async () => {
        fetch('http://bdd-pa.maxenceguinard.fr/PHP/php_scripts/search/Get_markers.php')
            .then(response => {
                return response.json();
            })
            .then(responseJson => {
                console.log(responseJson)
                for (let i = 0; i < Object.keys(responseJson).length; i++) {
                    let { markers } = this.state;
                    markers.push({
                        id: responseJson[i].id, title: responseJson[i].name, coordinates: { longitude: Number(responseJson[i].lng.substring(0, 10)), latitude: Number(responseJson[i].lat.substring(0, 10)) },
                        color: responseJson[i].eventType_id, address: responseJson[i].address, description: responseJson[i].description,
                        dateDebut: responseJson[i].dateDebut.substring(0, 16), dateFin: responseJson[i].dateFin.substring(0, 16)
                    });
                    this.setState({ markers: markers })
                };
            })
    }

    componentDidMount() {
        this.getData();
        // this.getCurrentMarker();
    }

    getCurrentMarker = async (markerData) => {
        await this.setState({ Current_id: markerData.id });
        await this.setState({ Current_title: markerData.title });
        await this.setState({ Current_description: markerData.description });
        await this.setState({ Current_address: markerData.address });
        await this.setState({ Current_begin: markerData.dateDebut });
        await this.setState({ Current_end: markerData.dateFin });
        global.longitude = markerData.longitude;
        global.latidude = markerData.latidude;
        //console.log('yo');
        //console.log(markerData.title);
        // this.updateMarker(markerData)
        this.checkEvent();
        this._panel.show();
    }

    checkEvent() {

        fetch('http://bdd-pa.maxenceguinard.fr/PHP/php_scripts/search/Get_user_events.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                user: 43,

                event: this.state.Current_id,

            })

        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                if (responseJson === 'Data Matched') {
                    this.setState({ state_event: '1' });
                }
                else {
                    this.setState({ state_event: '0' });
                }
            }).catch((error) => {
                console.error(error);
            });
    }

    JoinEventButton() {
        if (this.state.state_event == 1) {
            return (
                <TouchableOpacity
                    style={styles.buttonAlreadyJoin}
                >
                    <Text>Rejoins </Text>
                </TouchableOpacity>)
        }
        else {
            return (
                <TouchableOpacity
                    style={styles.buttonJoin}
                    onPress={() => this.JoinEvent()}
                >
                    <Text>Rejoindre </Text>
                </TouchableOpacity>)
        }
    }

    JoinEvent = async () => {
        //console.log(this.state.Current_id)
        fetch('http://bdd-pa.maxenceguinard.fr/PHP/php_scripts/search/Join_event.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                user: 43,

                event: this.state.Current_id,

            })

        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                if (responseJson === 'Event added') {
                    alert('Evenement rejoint');
                    this.setState({ state_event: '1' });
                }
                else {
                    this.setState({ state_event: '0' });
                }
            }).catch((error) => {
                console.error(error);
            });
    }
    //                        {
    //    this.state.markers.map((marker, index) => (
    //        <MapView.Marker
    //            coordinate={marker.coordinates}
    //            title={marker.title}
    //            //onPress={() => this._panel.show()}
    //            onPress={this.getCurrentMarker.bind(this, marker)}
    //        />
    //    ))
    //}

    render() {

        return (
            <View>
                < ScrollView
                    style={{ backgroundColor: 'lightskyblue' }}>
                    <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row' }}>

                        {this.state.markers.map((marker, index) => (
                            <TouchableOpacity onPress={this.getCurrentMarker.bind(this, marker)}>
                                <Image
                                    key={index}
                                    style={styles.image}
                                    source={{ uri: 'https://www.ale-athletisme.com/wp-content/uploads/2014/09/affiche-10-km-valence.jpg' }}
                                //onPress={() => this._panel.show()}

                                />
                            </TouchableOpacity>
                        ))}

                    </View>
                </  ScrollView>
                <SlidingUpPanel ref={c => this._panel = c}>

                    <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center', }}>
                        <View style={styles.line} />
                        <View style={styles.container}>
                            <View>
                                <Image
                                    style={styles.imageDetails}
                                    source={{ uri: 'https://www.ale-athletisme.com/wp-content/uploads/2014/09/affiche-10-km-valence.jpg' }}
                                />
                                {this.JoinEventButton()}
                            </View>

                            <View style={styles.text_box} >

                                <Text style={styles.title_text}>{this.state.Current_title} </Text>
                                <Text style={styles.text}>{this.state.Current_description}</Text>
                                <Text style={styles.text}>{this.state.Current_address}</Text>
                                <Text style={styles.text}>du {this.state.Current_begin}</Text>
                                <Text style={styles.text}>au {this.state.Current_end}</Text>

                            </View>
                        </View>

                    </View>
                </SlidingUpPanel>
            </View>
        );
    }
}
export default List;


const styles = {
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        marginTop: -20,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },

    text_box: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        borderTopRightRadius: 20,
    },

    image: {

        width: 110,
        height: 169,
        marginTop: 15,
        marginLeft: 15,
        backgroundColor: 'gray',
    },

    imageDetails: {

        width: 110,
        height: 169,
        marginTop: 50,
        marginLeft: 15,
        backgroundColor: 'gray',
    },

    title_text: {
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 50,
        marginLeft: 30,
        flexWrap: 'wrap',
        paddingRight: 5
    },

    text: {
        fontSize: 18,
        marginTop: 20,
        marginLeft: 30,
        flexWrap: 'wrap',
        marginRight: 10,
        paddingRight: 20
    },

    line: {
        width: 60,
        height: 5,
        elevation: 1,
        marginTop: 350,
        borderRadius: 20,
        backgroundColor: 'silver',
    },

    buttonJoin: {
        marginLeft: 15,
        borderRadius: 20,
        marginTop: 20,
        alignItems: "center",
        backgroundColor: "#87CEEB",
        padding: 10
    },

    buttonAlreadyJoin: {
        marginLeft: 15,
        borderRadius: 20,
        marginTop: 20,
        alignItems: "center",
        backgroundColor: "#7CFC00",
        padding: 10
    }
}