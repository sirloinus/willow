import React from 'react'
import { StyleSheet, Modal, View } from 'react-native'
import ImageDataCard from './ImageDataCard';

class ViewImageCardModal extends React.Component {

    render() {
        const { modalVisible, item, setModalVisibility, deleteAnalysedPhotoFromApi, removeAnalysedPhotoFromLibrary } = this.props
        return (
            <Modal visible={modalVisible}
                transparent={true}
                position='center'
                backdrop={true}
                animationType='fade'
                onRequestClose={setModalVisibility} >
                <ImageDataCard
                    photoURI={item.photoUri} 
                    selectedItems={JSON.parse(item.labels)}
                    setModalVisibility={setModalVisibility}
                    viewButton={true}
                    removeAnalysedPhotoFromLibrary={removeAnalysedPhotoFromLibrary}
                    deleteAnalysedPhotoFromApi={deleteAnalysedPhotoFromApi}
                    item={item}
                />
            </Modal>
        )
    }
}

export default ViewImageCardModal
