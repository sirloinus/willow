import React from 'react'
import { View, StyleSheet, ImageBackground } from 'react-native'
import { MediaLibrary, Permissions } from 'expo'

import IconButton from '../common/IconButton';
import ImageDataCard from '../ImageDataCard';

class ImageDetailsScreen extends React.Component {

    saveImageToCameraRoll = async (photoURI) => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if (status === 'granted') {
            try {
                const asset = await MediaLibrary.createAssetAsync(photoURI)
                MediaLibrary.createAlbumAsync('Willow', asset)
                    .then(console.log('Album Created'))
            } catch (error) {
                console.log(error)
            }
        } else {
            Alert.alert('Please go to phone settings to enable saving')
        }
    }

    render() {
        const { saveImageToCameraRoll} = this
        const { navigation } = this.props
        const photoURI = navigation.getParam('photoURI', 'no pic found')
        const selectedItem = navigation.getParam('selectedItem', 'no selected item')
        const selectedItems = navigation.getParam('selectedItems', 'no selected items')

        return (
            <ImageBackground source={require('../../../assets/images/ehud-neuhaus-162166-unsplash.jpg')} style={styles.backgroundImage}>
                <View style={styles.container}>
                    <ImageDataCard photoURI={photoURI} selectedItem={selectedItem} selectedItems={selectedItems}/>
                </View>    
                <View style={styles.lowerButtonsContainer}>
                    <IconButton
                        is_transparent={true}
                        icon='save'
                        style={styles.cameraButton}
                        onPress={() => {
                            saveImageToCameraRoll(photoURI)
                            // TODO: make post request to user db with picture info
                            this.props.navigation.navigate('Library')
                        }} />
                </View> 
            </ImageBackground>
        )
    }
}

export default ImageDetailsScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    lowerButtonsContainer: {
        width: '100%',
        height: 50,
        alignItems: 'center',
        position: 'absolute',
        bottom: 5,
    },
    cameraButton: {
        padding: 10
    },
})