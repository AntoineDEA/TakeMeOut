import * as React from 'react';
import { Button, View, Text, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import SlidingUpPanel from 'rn-sliding-up-panel';



//{
//    id: 1,
//    amount: 199,
//    coordinate: {
//        latitude: LATITUDE + 0.004,
//        longitude: LONGITUDE - 0.004,
//    },
//},
//{
//    id: 2,
//    amount: 285,
//    coordinate: {
//        latitude: LATITUDE - 0.004,
//        longitude: LONGITUDE - 0.004,
//    },
//},


//<MapView.Marker
//    pinColor={"purple"}
//    coordinate={{
//        latitude: 47.471172,
//        longitude: -0.551752
//    }}
//    title={"Titre"}
//    description={"Description"}
//    onPress={() => this._panel.show()}
///>

class Map extends React.Component {

    constructor(props) {
        global.longitude = -0.551752;
        global.latidude = 47.471172;

        super(props);
        this.state = {
            markers: [],
            userEvents: [],
        }
        { state_event: '' };
        { Current_id: '' };
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
    }

    getCurrentMarker = async(markerData) => {
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

    //buttonJoin() {
    //    this.userEvent();
    //}

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
                if (responseJson === 'Data Matched') {
                    this.setState({ state_event: '1'});
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

    //console.log("bonjour")
    //if (1 == event.user_id) {
    //    if (this.state.Current_id == event.event_id) {
    //        return (
    //            <TouchableOpacity
    //                style={styles.buttonJoin}
    //                onPress={this.onPress}
    //            >
    //                <Text>Rejoindre </Text>
    //            </TouchableOpacity>)
    //    }
    //    else {
    //        return (
    //            <TouchableOpacity
    //                style={styles.buttonAlreadyJoin}
    //                onPress={this.onPress}
    //            >
    //                <Text>Rejoins </Text>
    //            </TouchableOpacity>)
    //    }
    //}
    //else {
    //    return (
    //        <TouchableOpacity
    //            style={styles.buttonJoin}
    //            onPress={this.onPress}
    //        >
    //            <Text>Rejoindre </Text>
    //        </TouchableOpacity>)
    //}

//console.log(this.state.userEvents[1].user_id);
//for (let j; j <= this.state.userEvents.length; j++) {
//    console.log('ghj')
//    console.log('rffff')
//    if (1 == this.state.userEvents[i].user_id) {
//        if (this.state.Current_id == this.state.userEvents[i].event_id) {
//            return (
//                <TouchableOpacity
//                    style={styles.buttonJoin}
//                    onPress={this.onPress}
//                >
//                    <Text>Rejoindre </Text>
//                </TouchableOpacity>)
//        }
//        else {
//            return (
//                <TouchableOpacity
//                    style={styles.buttonAlreadyJoin}
//                    onPress={this.onPress}
//                >
//                    <Text>Rejoins </Text>
//                </TouchableOpacity>)
//        }
//    }
//    else {
//        console.log('rr')
//        return (
//            <TouchableOpacity
//                style={styles.buttonJoin}
//                onPress={this.onPress}
//            >
//                <Text>Rejoindre </Text>
//            </TouchableOpacity>)
//    }
//}


color_event(type) {
    //console.log(type);
    if (type == 1 || type == 5) {
        return '#e0e020';   //jaune
    }
    else if (type == 2) {
        return '#008000';   //vert
    }
    else {
        return '#EE82EE';   //violet
    }
}


render() {
    //console.log(this.state.userEvents.length);
    return (
        <View style={{ flex: 1 }}>
            <MapView
                style={{ flex: 1 }}
                region={{ latitude: global.latidude, longitude: global.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
                onRegionChange={this.onRegionChange}
                showsUserLocation={true}
            >
                {this.state.markers.map((marker, index) => (
                    // console.log(global.color),
                    <MapView.Marker
                        coordinate={marker.coordinates}
                        title={marker.title}
                        //pinColor='blue'

                        pinColor={this.color_event(marker.color)}
                        //onPress={() => this._panel.show()}
                        onPress={this.getCurrentMarker.bind(this, marker)}
                    />
                ))}


            </MapView>

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
                            <Text style={styles.text}>{this.state.Current_begin}</Text>
                            <Text style={styles.text}>{this.state.Current_end}</Text>
                        </View>
                    </View>
                </View>
            </SlidingUpPanel>

        </View>

    );
}
}
export default Map;


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
        width: 130,
        height: 200,
        marginTop: 40,
        marginLeft: 20,
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
        // Bouton pour cacher fenêtre

   // < Button title = 'Hide' onPress = {() => this._panel.hide()} />