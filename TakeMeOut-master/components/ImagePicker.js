
// source: https://docs.expo.io/versions/latest/sdk/imagepicker/

import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
//import Constants from 'expo-constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
//import Profil, {DefineURI} from './profil.js';

export default function ImagePickerExample() {

    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }

    };

    return (
        <View>
            <View style={{
                flex: 1,
                width: 180,
                borderRadius: 90,
                borderWidth: 5,
                overflow: 'hidden',
                borderColor: "gray",
                alignItems: "center",
            }}>
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            </View>

            <View style={{
                position: 'absolute',
                right: 10,
                bottom: 10,
                borderWidth: 1,
                borderRadius: 90,
                borderColor: 'gray',
                width: 35,
                height: 35,
                overflow: 'hidden',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'gray',

            }}>
                <TouchableOpacity onPress={pickImage}>
                    <Image style={{
                        width: 20,
                        height: 20,
                    }} source={require('../pictures/logo_edit.png')} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

