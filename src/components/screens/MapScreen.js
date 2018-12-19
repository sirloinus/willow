import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Permissions, Location } from 'expo'

import Map from '../Map'
// import REGION LOCATIONS DELTAS from './src/data/data.js'

// const deltas = {
//     latitudeDelta: 0.0922,
//     longitudeDelta: 0.0421
// }

class MapScreen extends React.Component {

    state = {
        region: {
            latitude: 51.440235,
            longitude: -0.272597,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
            // latitude: null,
            // longitude: null,
            // latitudeDelta: null,
            // longitudeDelta: null,
        },
        locations: [
            { id: 1, name: "King Henry's Mound", description: 'nice lil place', coords: { latitude: 51.444937, longitude: -0.294785 } },
            { id: 2, name: "Rhino", coords: { latitude: 51.438596, longitude: -0.287324 } },
            { id: 3, name: "Birch Tree Forest", coords: { latitude: 51.438359, longitude: -0.279827 } },
            { id: 4, name: "Dancing in the Woods: White Lodge", coords: { latitude: 51.445139, longitude: -0.264864 } },
        ]
    }

    componentDidMount() {
        this.getLocationAsync()
    }

    getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION)
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied'
            })
        }

        let location = await Location.getCurrentPositionAsync({})
        const region = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }
        this.setState({ region })
    }

    handlePress = event => {
        // TODO: add marker to database 
        this.setState({
            locations: [
                ...this.state.locations,
                {
                    coords: event.nativeEvent.coordinate
                }
            ]
        }, () => {
            console.log(this.state.locations)
        })

    }

    render() {
        const { region, locations } = this.state
        const { handlePress } = this
        return (
            
            <View style={styles.container}>
            {this.state.region.latitude &&
               <Map region={region} locations={locations} handlePress={handlePress}/>
            }
           </View>
        )
    }
}

export default MapScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})