import React from 'react'
import { View, Text, StyleSheet, ImageBackground, Alert, Image } from 'react-native'
import { FileSystem } from 'expo'

const PHOTOS_DIR = FileSystem.documentDirectory + 'photos'

class AnalysisScreen extends React.Component {

    state = {
        photos: [],
        currentPhoto: null
    }

    componentDidMount = async () => {
        const photos = await FileSystem.readDirectoryAsync(PHOTOS_DIR)
        this.setState({ 
            photos,
            currentPhoto: photos[photos.length - 1]
        })
    }

    render() {
        // const { navigation } = this.props
        // const pictureObj = navigation.getParam('picture', 'picture not found')
        const uri = `${PHOTOS_DIR}/${this.state.currentPhoto}`
    
        return (
            <ImageBackground source={require('../../../assets/images/ehud-neuhaus-162166-unsplash.jpg')} style={styles.backgroundImage}>
                <View style={styles.container}>
                    <Image
                        source={{ uri }}
                        style={styles.picture}
                        resizeMode='cover'
                    />
                    <Text style={{ fontSize: 23, color: 'white' }}>
                        data from google vision api ....
                        ....
                        ....
                        ....
                    </Text>
                </View>
            </ImageBackground>
        )
    }
}

export default AnalysisScreen

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
    picture: {
        alignSelf: 'center',
        width: 150,
        height: 150,
        borderWidth: 1,
        borderRadius: 75,
    }
})