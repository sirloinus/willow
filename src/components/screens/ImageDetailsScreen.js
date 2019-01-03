import React from 'react'
import { View, StyleSheet, ImageBackground, Alert } from 'react-native'
import { MediaLibrary, Permissions } from 'expo'
import { StackActions, NavigationActions } from 'react-navigation'

import IconButton from '../common/IconButton';
import ImageDataCard from '../ImageDataCard';

class ImageDetailsScreen extends React.Component {

    handleOnPress = async (photoURI, selectedItems) => {
        this.saveImageToCameraRoll(photoURI)
        this.postImageAndDataToServer(photoURI, selectedItems)
    }

    postImageAndDataToServer = async (photoURI, selectedItems, userId = 1) => {

        // TODO: change user_id below to the id of signed-in user

        const stringifiedItems = JSON.stringify(selectedItems)
        try { 
            const response = await fetch('https://willow-rails-api.herokuapp.com/api/v1/analysed_photos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    analysed_photo: {
                        user_id: userId,
                        photoUri: photoURI,
                        labels: stringifiedItems
                    }
                })
            })
        } catch (error) {
            console.log(error)
        }
    }

    saveImageToCameraRoll = async (photoURI) => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if (status === 'granted') {
            const album = await MediaLibrary.getAlbumAsync('Willow')
            if(album === null) {
                try {
                    const asset = await MediaLibrary.createAssetAsync(photoURI)
                    MediaLibrary.createAlbumAsync('Willow', asset)
                        .then(console.log('Album Created'))
                } catch (error) {
                    console.log(error)
                }
            } else {
                try {
                    const asset = await MediaLibrary.createAssetAsync(photoURI)
                    const assetAdded = await MediaLibrary.addAssetsToAlbumAsync(asset, album, false)
                } catch (error) {
                    console.log(error)
                }
            }
        } else {
            Alert.alert('Please go to phone settings to enable saving')
        }
    }

    render() {
        const { handleOnPress} = this
        const { navigation } = this.props
        const photoURI = navigation.getParam('photoURI', 'no pic found')
        const selectedItem = navigation.getParam('selectedItem', 'no selected item')
        const selectedItems = navigation.getParam('selectedItems', 'no selected items')

        return (
            <ImageBackground source={require('../../../assets/images/blurredpuddle3.jpg')} style={styles.backgroundImage}>
                <View style={styles.container}>
                    <ImageDataCard photoURI={photoURI} selectedItem={selectedItem} selectedItems={selectedItems}/>
                </View>    
                <View style={styles.lowerButtonsContainer}>
                    <IconButton
                        is_transparent={true}
                        icon='save'
                        style={styles.cameraButton}
                        onPress={() => {
                            handleOnPress(photoURI, selectedItems)
                            this.props.navigation.navigate('Camera')
                            // this.props.navigation.dispatch(StackActions.reset({ index: 1, actions: [NavigationActions.navigate({ routeName: 'Camera' }), NavigationActions.navigate({ routeName: 'Library' })] }))
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