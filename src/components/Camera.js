import React from 'react'
import { Text, View, TouchableOpacity, TouchableHighlight, StyleSheet, Alert, FlatList, Modal, Image } from 'react-native'
import { Camera, Permissions, FileSystem } from 'expo'
import store from 'react-native-simple-store'

import IconButton from '../components/common/IconButton'
import { getPathSafeDatetime, uniqid, friendlyDate } from '../lib/general'

class CameraLens extends React.Component {

    constructor(props){
        super(props)
        this.document_dir = FileSystem.documentDirectory
        this.filename_prefix = 'willow_'
    }

    state = {
        camera_visible: true,
        photo_visible: false,
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        picture: null
    }
    
    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({hasCameraPermission: status === 'granted'})
        // const response = await store.get('pictures')
        // if (response) {
        //     this.setState({ pictures: response })
        // }
    }

    flipCamera = () => {
        this.setState({
            type: this.state.type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back,
        })
    }

    takePicture = () => {
        if(this.camera){
            this.camera.takePictureAsync()
                .then((data) => {
                    // let datetime = Date.now()
                    let datetime = getPathSafeDatetime()
                    let file_path = `${this.document_dir}${this.filename_prefix}${datetime}.jpg`
                    FileSystem.moveAsync({
                        from: data.uri,
                        to: file_path
                    })
                    .then(response => {
                        let photo_data = {
                            key: uniqid(),
                            name: datetime
                        }
                        store.push('pictures', photo_data)
                        this.setState({ picture: photo_data })
                        Alert.alert('Saved')
                    })
                })
        }
    }

    flash = () => {

    }

    renderPicture = (picture) => {
        // let name = friendlyDate(picture.name)
        let name = picture.name
        let photo_url = `${this.document_dir}${this.filename_prefix}${picture.name}.jpg`
        return (
            <TouchableHighlight key={picture.key} style={styles.list_item} underlayColor="#ccc" onPress={() => {
                this.showPhoto(picture)
            }}>
                <View style={styles.image_container}>
                    <Image
                        source={{ uri: photo_url }}
                        style={styles.image}
                        ImageResizeMode={"contain"} />
                </View>
            </TouchableHighlight>
        )
    }

    showPhoto = picture => {
        this.setState({
            photo_visible: true,
            camera_visible: false,
            picture: {
                url: `${this.document_dir}${this.filename_prefix}${picture.name}.jpg`,
                label: picture.name,
                // label: friendlyDate(picture.name)
            }
        })
    }

    closePhoto = () => {
        this.setState({
            photo_visible: false,
            camera_visible: true
        })
    }

    render() {
        const { hasCameraPermission, picture, type, photo_visible } = this.state
        const { flipCamera, takePicture, flash, renderPicture, closePhoto } = this
        if (hasCameraPermission === null){
            return <View/>
        } else if (hasCameraPermission === false){
            return <Text>No access to camera</Text>
        } else {
            return (
                <View style={styles.container}>
                    <Camera style={styles.wrapper} type={type} ref={ref => { this.camera = ref }} >
                        <View style={styles.cameraBody}>
                            <View style={styles.lowerButtonsContainer}>
                                <IconButton is_transparent={true}
                                    icon='switch-camera'
                                    style={styles.cameraButton}
                                    onPress={flipCamera} />
                                <IconButton is_transparent={true} 
                                    icon='camera'
                                    style={styles.cameraButton}
                                    onPress={takePicture} />
                                <IconButton is_transparent={true}
                                    icon='flash-on'
                                    style={styles.cameraButton}
                                    onPress={flash}
                                    />
                            </View>
                        </View>     
                    </Camera>
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={photo_visible}
                        onRequestClose={() => {
                            this.setState({ photo_visible: false, camera_visible: true})
                        }}
                    >
                    {
                        !!picture &&
                            <View style={{flex: 1}}>
                                <Image
                                    source={{uri: picture.url}}
                                    style={{flex: 1}}
                                    ImageResizeMode={'contain'}
                                />
                                <IconButton
                                    is_transparent={true}
                                    icon='close'
                                    style={styles.closeButton}
                                    onPress={closePhoto}
                                />

                            </View>
                    }
                    </Modal>
                    {
                        !picture && Alert.alert('Take a picture to identify!')
                    }
                    {
                        !!picture && 
                        renderPicture(picture)

                    }
                </View>
            )
        }
    }
}

export default CameraLens 

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {
        flex: 1,
    },
    cameraBody: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'column',
    },
    lowerButtonsContainer: {
        flex: 1,
        width: '100%',
        height: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
    },
    cameraButton: {
        padding: 10
    },
    closeButton: {
        position: 'absolute',
        top: 0,
        left: 0,
        padding: 10,
    },
    list_item: {
        flex: 1,
        padding: 10
    },
    image_container: {
        alignItems: 'center'
    },
    image: {
        width: 130,
        height: 130,
    },
})