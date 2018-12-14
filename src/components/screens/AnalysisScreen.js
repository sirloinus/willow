import React from 'react'
import { View, Text, StyleSheet, ImageBackground, Alert, Image, Button, FlatList } from 'react-native'
import { FileSystem } from 'expo'

import apiKey from '../../lib/api'

const PHOTOS_DIR = FileSystem.documentDirectory + 'photos'

class AnalysisScreen extends React.Component {

    state = {
        photos: [],
        currentPhoto: null,
        photoURI: null,
        photoBase64: null,
        photoAnalysedData: null,
        filteredLabelAnnotations: null,
        filteredWebDetection: null,
    }

    async componentDidMount() {
        const photos = await FileSystem.readDirectoryAsync(PHOTOS_DIR)
        const sortedPhotos = photos.sort()
        const currentPhoto = sortedPhotos[sortedPhotos.length-1]
        const photoURI = `${PHOTOS_DIR}/${currentPhoto}`

        this.setState({ 
            sortedPhotos,
            currentPhoto,
            photoURI
        })

        const photoBase64 = await FileSystem.readAsStringAsync(photoURI, {
            encoding: FileSystem.EncodingTypes.Base64
        })

        this.setState({ photoBase64 })

        console.log('current photo:', currentPhoto)

        this.getImageDataFromVisionApi()
    }

    getImageDataFromVisionApi = async () => {
        const body = {
            requests: [{
                    image: { content: this.state.photoBase64 },
                    features: [
                        {
                            type: 'LABEL_DETECTION',
                            maxResults: 15
                        }, {
                            type: 'WEB_DETECTION',
                            maxResults: 15
                        }, {
                            type: 'IMAGE_PROPERTIES',
                        }
                    ]
                }]
        }
        const key = apiKey.key        
        const response = await fetch(`https://vision.googleapis.com/v1/images:annotate?key=${key}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })           
        const parsed = await response.json()

        this.setState({
            photoAnalysedData: parsed.responses[0]
        }) 

        this.filterImageData()
    }

    filterImageData = () => {
        const labelAnnotations = [...this.state.photoAnalysedData.labelAnnotations]
        const webDetection = [...this.state.photoAnalysedData.webDetection.webEntities]
        const filteredLabelAnnotations = labelAnnotations.filter(labelObj => labelObj.description != null)
        const filteredWebDetection = webDetection.filter(webObj => webObj.description != null)



        this.setState({
            filteredLabelAnnotations,
            filteredWebDetection
        })
        console.log('*********FILTERED DATA IN STATE:' ,this.state.filteredLabelAnnotations, "****", this.state.filteredWebDetection)
    

    }

    analyseFilteredImageData = () => {

    }

    render() {
        // const { navigation } = this.props
        // const pictureObj = navigation.getParam('picture', 'picture not found')
        // console.log(pictureObj)
       
        const { photoURI, photos, filteredLabelAnnotations, filteredWebDetection } = this.state

        return (
            <ImageBackground source={require('../../../assets/images/ehud-neuhaus-162166-unsplash.jpg')} style={styles.backgroundImage}>
                <View style={styles.container}>
                    <Image
                        source={{ uri: `${photoURI}` }}
                        style={styles.picture}
                        resizeMode='cover'
                    />
                    <Text style={{ fontSize: 23, color: 'white' }}>
                        Length of photo array: {photos.length}
                    </Text>
                    <FlatList
                        data={filteredLabelAnnotations}
                        renderItem={({item}) => 
                            <Text style={styles.item}>
                                {item.description} {(item.score * 100).toFixed(2) > 100 ? 100 : (item.score * 100).toFixed(2)} %
                            </Text>
                        }
                        keyExtractor={(item, index) => index.toString()}
                    />
                    <FlatList
                        data={filteredWebDetection}
                        renderItem={({ item }) =>
                            <Text style={styles.item}>
                                {item.description} {(item.score * 100).toFixed(2) > 100 ? 100 : (item.score * 100).toFixed(2)} %
                            </Text>
                        }
                        keyExtractor={(item, index) => index.toString()}
                    />
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
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
        color: 'white'
    },
})