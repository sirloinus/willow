import React from 'react'
import { View, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
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
            const response = await fetch(`http://localhost:3000/api/v1/users/${userId}`)
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

            <ImageBackground source={require('../../../assets/images/claus-grunstaudl-664432-unsplash.jpg')} style={styles.backgroundImage}>
                <ScrollView contentContainerStyle={styles.content}>
                    {analysedPhotos.map(item =>
                        <ImageDataCard photoURI={item.photoUri} selectedItems={JSON.parse(item.labels)} />
                    )}
                </ScrollView>
            </ImageBackground>

        )
    }
}

export default LibraryScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        // paddingVertical: 80
        padding: 10,
        flexGrow: 1
    }
})