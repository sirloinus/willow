import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { Camera, Permissions } from 'expo'

import IconButton from '../components/common/IconButton'

class CameraLens extends React.Component {

    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back
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

    takePicture = () => {
        
    }

    flash = () => {
        
    }

    render() {
        const { hasCameraPermission } = this.state
        const { flipCamera, takePicture, flash } = this
        if (hasCameraPermission === null){
            return <View/>
        } else if (hasCameraPermission === false){
            return <Text>No access to camera</Text>
        } else {
            return (
                <View style={styles.container}>
                    <Camera style={styles.wrapper} type={this.state.type} ref={ref => { this.camera = ref }} >
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
})