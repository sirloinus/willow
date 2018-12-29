import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Swipeout from 'react-native-swipeout'

class LocationsListItem extends React.Component {

    deleteLocation = async item => {
        try {
            const response = await fetch(`https://willow-rails-api.herokuapp.com/api/v1/markers/${item.id}`, {
                method: 'DELETE'
            })
            // const parsed = await response.json()
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
                backgroundColor: '#5c9d8e',
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
                                defaultSource={require('../../assets/images/jeremy-allouche-523367-unsplash.jpg')}
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
        width: '90%',
        marginLeft: '5%',
        marginRight: '5%',
        marginBottom: 7,
        flexDirection: 'column',
    },
    flatview: {
        flex: 1,
        flexDirection: 'row',
        // justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        // backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 10
    },
    image: {
        width: 76,
        height: 76,
        borderRadius: 38,
        margin: 5,
        padding: 5
    },
    textContainer: {
        flex: 1,
        flexDirection: 'column',
        height: 80,
    },
    title: {
        // color: '#5c9d8e',
        color: 'white',
        padding: 10,
        fontSize: 14
    },
    description: {
        color: 'white',
        padding: 10,
        fontSize: 12
    },
})