import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Swipeout from 'react-native-swipeout'

class LocationsListItem extends React.Component {

    deleteLocation = async item => {
        try {
            const response = await fetch(`https://willow-rails-api.herokuapp.com/api/v1/markers/${item.id}`, {
                method: 'DELETE'
            })
            const parsed = await response.json()
        } catch(error) {
            console.log(error)
        }
    }

    render() {
        const { item, deleteLocationFromList } = this.props
        const { deleteLocation } = this
        const buttons = [
            {
                text: 'Delete',
                backgroundColor: 'rgb(0, 196, 124)',
                onPress: () => { 
                    deleteLocation(item)
                    deleteLocationFromList(item)
                }
            },
        ]
        return (
            <TouchableOpacity>
                <View style={styles.container}>
                    <Swipeout
                        right={buttons}
                        autoClose={true}
                        backgroundColor='transparent'
                        style={{borderRadius: 10}}
                    >
                        <View style={styles.flatview}>
                            <Image
                                style={styles.image}
                                source={{ uri: `${item.photoURI}` }}
                                // TODO: add photo taking ability to location marker -- will need to update back-end
                                defaultSource={require('../../assets/images/adrian-infernus-1044263-unsplash.jpg')}
                            />
                            <View style={styles.textContainer}>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.description}>{item.description}</Text>
                            </View>
                        </View>
                    </Swipeout>
                </View>
            </TouchableOpacity>
        )
    }
    
}
    
export default LocationsListItem
    
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '94%',
        marginLeft: '3%',
        marginRight: '3%',
        marginBottom: 7,
        flexDirection: 'column',
    },
    flatview: {
        flex: 1,
        flexDirection: 'row',
        // justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: 10
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        margin: 5
    },
    textContainer: {
        flex: 1,
        flexDirection: 'column',
        height: 100,
    },
    title: {
        // color: '#5c9d8e',
        color: 'white',
        padding: 10,
        fontSize: 18
    },
    description: {
        color: 'white',
        padding: 10,
        fontSize: 14
    },
})