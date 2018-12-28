import React from 'react'
import { View, Text, StyleSheet, ImageBackground, ScrollView, Image } from 'react-native'

import ImageDataCard from '../ImageDataCard';

class LibraryScreen extends React.Component {

    state = {
        analysedPhotos: []
    }

    componentDidMount() {
        this.getAnalysedPhotosFromServer()
    }

    getAnalysedPhotosFromServer = async (userId = 1) => {
        try {
            const response = await fetch(`https://willow-rails-api.herokuapp.com/api/v1/users/${userId}`)
            const user = await response.json()
            const analysedPhotos = user.analysed_photos
            this.setState({ analysedPhotos })
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        const { analysedPhotos } = this.state

        return (
            // <ImageBackground source={require('../../../assets/images/claus-grunstaudl-664432-unsplash.jpg')} style={styles.backgroundImage}>
            //     <View style={styles.container}>
            //         <Text style={{ fontSize: 23, color: 'white' }}>
            //             LIBRARY SCREEN
            //         </Text>
            //         <FlatList
            //             data={analysedPhotos}
            //             renderItem={({item}) => 
            //                 <ImageDataCard photoURI={item.photoUri} selectedItems={JSON.parse(item.labels)}/>
            //             }
            //             keyExtractor={(item, index) => index.toString()} 
            //         />

            //         {analysedPhotos.map(item => 
            //             <ImageDataCard photoURI={item.photoUri} selectedItems={JSON.parse(item.labels)} />
            //         )}
            //     </View>
            // </ImageBackground>

            // <ImageBackground source={require('../../../assets/images/claus-grunstaudl-664432-unsplash.jpg')} style={styles.backgroundImage}>
            //     <ScrollView contentContainerStyle={styles.content}>
            //         {analysedPhotos.map(item => 
            //             <ImageDataCard photoURI={item.photoUri} selectedItems={JSON.parse(item.labels)} />
            //         )}
            //     </ScrollView>
            // </ImageBackground>

            <ImageBackground source={require('../../../assets/images/claus-grunstaudl-664432-unsplash.jpg')} style={styles.backgroundImage}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.gridContainer}>
                    {analysedPhotos.map(item =>
                        <View style={styles.boxContainer}>
                            <Image 
                                source={{ uri: `${item.photoUri}` }}
                                defaultSource={require('../../../assets/images/abhay-vyas-4071-unsplash.jpg')}
                                style={styles.picture}
                                resizeMode='cover'
                            />
                        </View>
                    )}
                    </View>
                </ScrollView>
            </ImageBackground>
        )
    }
}

export default LibraryScreen

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     backgroundColor: 'transparent',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        // paddingVertical: 80
        marginTop: 80,
        padding: 10,
        flexGrow: 1
    },
    scrollContainer: {
        flex: 1,
        marginTop: 90
    },
    gridContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
    },
    boxContainer: {
        width: 120,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        padding: 5,
    },
    picture: {
        width: '100%',
        height: '100%',
        borderRadius: 10
    }
})