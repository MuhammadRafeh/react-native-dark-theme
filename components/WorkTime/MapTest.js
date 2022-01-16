import React from 'react';
import MapView, { UrlTile } from 'react-native-maps';
import {View, StyleSheet} from 'react-native';
import { GeoPosition } from '../../models/GeoLocation';
import { checkDistance } from '../../services/DistanceValidationService';

export default function mapTest(props){

    const pos = new GeoPosition(48.1117, 11.5326, 5);

    const pos2 = new GeoPosition(48.1117, 11.5326, 0);

    const result = checkDistance(pos, pos2);

    console.log(result);

    return (
        <View style={styles.screen}>
            <MapView
                style={styles.map}
                initialRegion={
                    {
                        latitude: pos.lat,
                        longitude: pos.lng,
                        latitudeDelta: 0.9,
                        longitudeDelta: 0.4,
                    }
                }

            />
            <UrlTile
            urlTemplate="http://a.tile.openstreetmap.de/tiles/osmde/0/0/0.png"
            maximumZ={19}
            />

        </View>
    );
}
    const styles = StyleSheet.create({
        screen: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        map: {
            height: '100%',
            width: '100%',
        },
    }
    )

