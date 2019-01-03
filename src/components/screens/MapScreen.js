import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Permissions, Location } from 'expo'
import { NavigationEvents } from 'react-navigation';

import Map from '../Map'
import AddLocationMarkerModal from '../AddLocationMarkerModal';
// import REGION LOCATIONS DELTAS from './src/data/data.js'

// const deltas = {
//     latitudeDelta: 0.0922,
//     longitudeDelta: 0.0421
// }

class MapScreen extends React.Component {

    state = {
        modalVisible: false,
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
        locations: [],
        coordinates: null,
        locationTitle: null,
        locationDescription: null,
    }

    componentDidMount() {
        this.getLocationAsync()
        this.getUserMarkers()
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

    getUserMarkers = async () => {
        const id = 1    // TODO: change user_id below to the id of signed-in user
        try {
            const response = await fetch(`https://willow-rails-api.herokuapp.com/api/v1/users/${id}`)
            const user = await response.json()
            const locations = user.markers
            this.setState({ locations })
        } catch (error) {
            console.log(error)
        }
    }

    handlePress = event => {
        this.setState({
            modalVisible: true,
            coordinates: event.nativeEvent.coordinate
        })
    }

    handleModal = () => {
        this.setState({ modalVisible: !this.state.modalVisible })
    }

    handleChange = (event, name) => {
        this.setState({ [name]: event.nativeEvent.text })
    }

    saveLocationDetails = async () => {

        // TODO: change user_id below to the id of signed-in user

        const locationsCopy = [...this.state.locations]
        const newMarker = {
            user_id: 1,
            latitude: this.state.coordinates.latitude,
            longitude: this.state.coordinates.longitude,
            title: this.state.locationTitle,
            description: this.state.locationDescription
        }

        locationsCopy.push(newMarker)
        this.setState({ locations: locationsCopy})

        try {
            const response = await fetch('https://willow-rails-api.herokuapp.com/api/v1/markers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    marker: newMarker
                })
            })
            this.setState({
                modalVisible: false,
                coordinates: null,
                locationTitle: null,
                locationDescription: null, 
            })
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        const { region, locations, modalVisible, locationTitle, locationDescription } = this.state
        const { handleChange, handleModal, handlePress, saveLocationDetails, getUserMarkers } = this
        return (
            <View style={styles.container}>
                <NavigationEvents
                    onWillFocus={getUserMarkers}
                />

                {this.state.region.latitude && 
                    <Map
                        // region={region} 
                        initialRegion={region} 
                        locations={locations} 
                        handlePress={handlePress} />
                }
                <AddLocationMarkerModal 
                    modalVisible={modalVisible}
                    handleChange={handleChange}
                    locationTitle={locationTitle}
                    locationDescription={locationDescription}
                    saveLocationDetails={saveLocationDetails}
                    handleModal={handleModal} />
           </View>
        )
    }
}

export default MapScreen

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        display: 'flex',
        backgroundColor: 'black'
    },
})