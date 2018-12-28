import React from 'react'
import { View, Text, StyleSheet, ImageBackground, FlatList } from 'react-native'
import LocationsListItem from '../LocationsListItem';

class LocationsScreen extends React.Component {

    state = {
        locations: null
    }

    componentDidMount = async () => {
        this.getUserMarkers()
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

    deleteLocationFromList = item => {
        const updatedLocationsArray = this.state.locations.filter(location => location !== item)
        this.setState({ locations: updatedLocationsArray })
    }

    render() {
        const { locations } = this.state
        const { deleteLocationFromList } = this
        return (
            <ImageBackground source={require('../../../assets/images/holger-link-768311-unsplash.jpg')} style={styles.backgroundImage}>
                <View style={styles.container}>
                    <FlatList
                        style={styles.flatList}
                        data={locations}
                        renderItem={({item}) => 
                            <LocationsListItem item={item} deleteLocationFromList={deleteLocationFromList}/>
                        }
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </ImageBackground>
        )
    }
}

export default LocationsScreen

const styles = StyleSheet.create({
    container: {
        marginTop: 80,
        flex: 1,
        width: '100%',
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    flatList: {
        width: '100%',
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    }
})