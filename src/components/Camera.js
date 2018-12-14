import React from 'react'
import { Text, View, TouchableOpacity, TouchableHighlight, StyleSheet, Alert, FlatList, Modal, Image } from 'react-native'
import { Camera, Permissions, FileSystem } from 'expo'

import IconButton from '../components/common/IconButton'
import { getPathSafeDatetime, uniqid, friendlyDate } from '../lib/general'

class CameraLens extends React.Component {

    // constructor(props){
    //     super(props)
    //     this.document_dir = FileSystem.documentDirectory
    //     this.filename_prefix = 'willow_'
    // }

    componentWillMount() {
        FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'photos').catch(e => {
            console.log(e, 'Directory already exists')
        })
    }

    state = {
        camera_visible: true,
        photo_visible: false,
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        picture: null,
        flashMode: Camera.Constants.FlashMode.off
    }
    
    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({hasCameraPermission: status === 'granted'})
    }

    flipCamera = () => {
        this.setState({
            type: this.state.type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back,
        })
    }

    flash = () => {
        this.setState({
            flashMode: this.state.flashMode === Camera.Constants.FlashMode.off
                ? Camera.Constants.FlashMode.on
                : Camera.Constants.FlashMode.off
        })
    }

    takePicture = async () => {
        if(this.camera){
            const data = await this.camera.takePictureAsync()
            // let datetime = Date.now()
            let datetime = getPathSafeDatetime()
            let file_path = `${FileSystem.documentDirectory}photos/${datetime}.jpg`
            // let file_path = `${this.document_dir}${this.filename_prefix}${datetime}.jpg`
            await FileSystem.moveAsync({
                from: data.uri,
                to: file_path
            })
            let photo_data = {
                key: uniqid(),
                name: datetime
            }
            this.setState({
                picture: {
                    ...photo_data,
                    url: file_path,
                    label: datetime,
                },
                    photo_visible: true,
                    camera_visible: false,  
            })
        }
    }

    closePhoto = () => {
        this.setState({
            photo_visible: false,
            camera_visible: true
        })
    }

    render() {
        const { hasCameraPermission, picture, type, photo_visible, camera_visible, flashMode } = this.state
        const { flipCamera, takePicture, flash, renderPicture, closePhoto } = this

        if (hasCameraPermission === null){
            return <View/>
        } else if (hasCameraPermission === false){
            return <Text>No access to camera</Text>
        } else {
            return (
                <View style={styles.container}>
                { !!camera_visible &&
                    <Camera style={styles.wrapper} type={type} flashMode={flashMode} ref={ref => { this.camera = ref }} >
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
                                    color={!flashMode ? 'white' : 'yellow'}
                                    onPress={flash}
                                    />
                            </View>
                        </View>     
                    </Camera>
                }
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={photo_visible}
                        onRequestClose={() => {
                            this.setState({ photo_visible: false, camera_visible: true})
                        }} >
                    { !!picture &&
                        <View style={{flex: 1}}>
                            <Image
                                source={{uri: picture.url}}
                                style={{flex: 1}}
                                ImageResizeMode={'contain'} />
                            <View style={styles.lowerButtonsContainer}>
                                <IconButton
                                    is_transparent={true}
                                    icon='close'
                                    style={styles.cameraButton}
                                    onPress={closePhoto} />
                                <IconButton
                                    is_transparent={true}
                                    icon='search'
                                    style={styles.cameraButton}
                                    onPress={() => {
                                        this.setState({ photo_visible: false, camera_visible: true })
                                        this.props.navigation.navigate('Analysis', {
                                            picture: picture,
                                        })
                                    }}/>
                            </View>
                        </View>
                    }
                    </Modal>
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
        bottom: 5,
    },
    cameraButton: {
        padding: 10
    },
    closeButton: {
        position: 'absolute',
        top: 0,
        left: 0,
        padding: 10,
        backgroundColor: 'transparent'
    },
})