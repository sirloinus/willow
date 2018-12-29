import React from 'react'
import { View, Text, StyleSheet, ImageBackground, Alert, Image, FlatList } from 'react-native'
import { FileSystem } from 'expo'

import apiKey from '../../lib/api'
import ImageDataBubble from '../ImageDataBubble';
import IconButton from '../common/IconButton'

const PHOTOS_DIR = FileSystem.documentDirectory + 'photos'

class AnalysisScreen extends React.Component {

    state = {
        loading: false,
        error: null,
        photos: [],
        currentPhoto: null,
        photoURI: null,
        photoBase64: null,
        photoAnalysedData: null,
        filteredLabelAnnotations: null,
        filteredWebDetection: null,
        selectedItem: null,
        selectedItems: []
    }

    async componentDidMount() {
        const photos = await FileSystem.readDirectoryAsync(PHOTOS_DIR)
        const sortedPhotos = photos.sort()
        const currentPhoto = sortedPhotos[sortedPhotos.length-1]
        const photoURI = `${PHOTOS_DIR}/${currentPhoto}`

        this.setState({ 
            sortedPhotos,
            currentPhoto,
            photoURI,
            loading: true
        })

        const photoBase64 = await FileSystem.readAsStringAsync(photoURI, {
            encoding: FileSystem.EncodingTypes.Base64
        })

        this.setState({ photoBase64 })

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
        try {
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
                photoAnalysedData: parsed.responses[0],
                error: response.error || null
            }) 
        } catch (error) {
            Alert.alert(error)
            this.setState({ 
                error, 
                loading: false
            })
        }
        this.filterImageData()
    }

    filterImageData = () => {
        const labelAnnotations = [...this.state.photoAnalysedData.labelAnnotations]
        const webDetection = [...this.state.photoAnalysedData.webDetection.webEntities]
        const filteredLabelAnnotations = labelAnnotations.filter(labelObj => labelObj.description != null)
        const filteredWebDetection = webDetection.filter(webObj => webObj.description != null)

        this.setState({
            filteredLabelAnnotations,
            filteredWebDetection,
            loading: false
        })
    }

    selectItem = item => {
        const selectedItemsCopy = [...this.state.selectedItems]
        selectedItemsCopy.push(item)
        this.setState({ selectedItem: item, selectedItems: selectedItemsCopy}, () => {
            console.log('selected:', this.state.selectedItem)
        })
    }

    render() {
        // const { navigation } = this.props
        // const pictureObj = navigation.getParam('picture', 'picture not found')
        // console.log(pictureObj)
       
        const { photoURI, photos, filteredLabelAnnotations, filteredWebDetection, selectedItem, selectedItems } = this.state
        const { selectItem } = this

        return (
            <ImageBackground source={require('../../../assets/images/ehud-neuhaus-162166-unsplash.jpg')} style={styles.backgroundImage}>
                <View style={styles.container}>
                    <Image
                        source={{ uri: `${photoURI}` }}
                        style={styles.picture}
                        resizeMode='cover'
                    />
                    <Text style={styles.info}>
                        Select the most accurate label and click on pen icon to view the image card.
                    </Text>
                    <FlatList
                        data={filteredLabelAnnotations}
                        renderItem={({item}) => 
                            <ImageDataBubble item={item} selectItem={selectItem} selectedItem={selectedItem} />  
                        }
                        keyExtractor={(item, index) => index.toString()}
                    />
                    <IconButton
                        is_transparent={true}
                        icon='create'
                        style={styles.cameraButton}
                        onPress={() => {
                            this.props.navigation.navigate('Details', {
                                photoURI: photoURI,
                                selectedItem: selectedItem,
                                selectedItems: selectedItems
                            })
                    }} />
                </View>
            </ImageBackground>
        )
    }
}

export default AnalysisScreen

const styles = StyleSheet.create({
    container: {
        marginTop: 80,
        flex: 1,
        width: '100%',
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
    info: { 
        fontSize: 20, 
        color: 'white', 
        alignContent: 'center',
        width: '90%',
        marginLeft: '5%',
        marginRight: '5%' 
    },
    picture: {
        alignSelf: 'center',
        width: 150,
        height: 150,
        borderWidth: 1,
        borderRadius: 75,
        borderColor: 'transparent',
    },
    cameraButton: {
        padding: 10
    },
})