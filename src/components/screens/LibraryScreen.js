import React from 'react'
import { View, Text, StyleSheet, ImageBackground, ScrollView, Image } from 'react-native'
import { NavigationEvents } from 'react-navigation'

import ImageDataCard from '../ImageDataCard';
import SquareImageComponent from '../SquareImageComponent';
import ViewImageCardModal from '../ViewImageCardModal';

class LibraryScreen extends React.Component {

    state = {
        analysedPhotos: [],
        selectedItem: null,
        modalVisible: false
    }

    componentDidMount() {
        this.getAnalysedPhotosFromServer()
    }

    componentDidUpdate() {
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

    handlePress = item => {
        this.setState({ 
            selectedItem: item
        })
        this.setModalVisibility()
    }

    setModalVisibility = () => {
        this.setState({
            modalVisible: !this.state.modalVisible
        })
    }

    removeAnalysedPhotoFromLibrary = item => {
        const updatedAnalysedPhotosArray = this.state.analysedPhotos.filter(photo => photo !== item)
        this.setState({ analysedPhotos: updatedAnalysedPhotosArray })
    }

    deleteAnalysedPhotoFromApi = async item => {
        try {
            const response = await fetch(`https://willow-rails-api.herokuapp.com/api/v1/analysed_photos/${item.id}`, {
                method: 'DELETE'
            })
        } catch(error) {
            console.log(error)
        }
    }

    render() {
        const { analysedPhotos, selectedItem, modalVisible } = this.state
        const { handlePress, setModalVisibility, removeAnalysedPhotoFromLibrary, deleteAnalysedPhotoFromApi, getAnalysedPhotosFromServer } = this

        return (
            <ImageBackground source={require('../../../assets/images/blurredbark.jpg')} style={styles.backgroundImage}>
                {/* <NavigationEvents
                    onDidFocus={getAnalysedPhotosFromServer}
                /> */}
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.gridContainer}>
                    {analysedPhotos.map(item =>
                        <SquareImageComponent item={item} key={item.id} handlePress={handlePress}/>
                    )}
                    </View>
                </ScrollView>
                { selectedItem && 
                    <ViewImageCardModal
                        modalVisible={modalVisible}
                        item={selectedItem}
                        setModalVisibility={setModalVisibility} 
                        removeAnalysedPhotoFromLibrary={removeAnalysedPhotoFromLibrary}
                        deleteAnalysedPhotoFromApi={deleteAnalysedPhotoFromApi}
                    />
                }
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
        backgroundColor: 'black'
    },
    content: {
        // paddingVertical: 80
        marginTop: 40,
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
})