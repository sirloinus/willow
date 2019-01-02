import React from 'react'
import { View, Image, StyleSheet, FlatList, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'

import ImageDataBubble from './ImageDataBubble';
import IconButton from './common/IconButton';
import ImageDataBubbleForCard from './ImageDataBubbleForCard';

const ImageDataCard = ({ item, photoURI, selectedItems, setModalVisibility, viewButton = false, removeAnalysedPhotoFromLibrary, deleteAnalysedPhotoFromApi}) => {
    
    return (
        <TouchableOpacity onPressOut={setModalVisibility}>
            <TouchableWithoutFeedback>
                <View style={styles.cardWrapper}>
                    <View style={styles.card}>
                        <Image
                            source={{ uri: `${photoURI}` }}
                            defaultSource={require('../../assets/images/abhay-vyas-4071-unsplash.jpg')}
                            style={styles.picture}
                            resizeMode='cover'
                        />
                        <FlatList 
                            data={selectedItems}
                            renderItem={({ item }) =>
                                // <ImageDataBubble item={item} />
                                <ImageDataBubbleForCard item={item}/>
                            }
                            keyExtractor={(item, index) => index.toString()}
                        />
                        { viewButton && 
                        <View style={styles.buttons}> 
                            <IconButton
                                is_transparent={true}
                                icon='close'
                                style={styles.button}
                                onPress={setModalVisibility}
                                color={'black'}
                            /> 
                            <IconButton
                                is_transparent={true}
                                icon='delete'
                                style={styles.button}
                                onPress={() => {
                                    setModalVisibility()
                                    removeAnalysedPhotoFromLibrary(item)
                                    deleteAnalysedPhotoFromApi(item)
                                    console.log('hallooo')
                                }}
                                color={'black'}
                            /> 
                        </View>
                        }
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </TouchableOpacity>
    )
}

export default ImageDataCard

const styles = StyleSheet.create({
    cardWrapper: {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        width: 300,
        // backgroundColor: 'rgba(0, 0, 0, 0.9)',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 80,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    picture: {
        alignSelf: 'center',
        width: 150,
        height: 150,
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 75,
    },
    button: {
        padding: 10
    },
    buttons: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    }
})