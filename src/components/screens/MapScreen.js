import React from 'react'
import { View, StyleSheet } from 'react-native'

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
            longitudeDelta: 0.0421
        },
        locations: [
            { id: 1, name: "King Henry's Mound", coords: { latitude: 51.444937, longitude: -0.294785 } },
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
            });
        }

        let location = await Location.getCurrentPositionAsync({})
        const region = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            ...deltas
        };
        await this.setState({ region });
    }

    render() {
        const { region, locations } = this.state
        return (
            <View style={styles.container}>
               <Map region={region} locations={locations}/>
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