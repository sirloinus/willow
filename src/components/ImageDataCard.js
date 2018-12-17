import React from 'react'
import { View, Image, StyleSheet, FlatList } from 'react-native'

import ImageDataBubble from './ImageDataBubble';

const ImageDataCard = ({ photoURI, selectedItem, selectedItems }) => {
    console.log(photoURI, selectedItems)
    return (
        <View style={styles.cardWrapper}>
            <Image
                source={{ uri: `${photoURI}` }}
                style={styles.picture}
                resizeMode='cover'
            />
            <FlatList 
                data={selectedItems}
                renderItem={({ item }) =>
                    <ImageDataBubble item={item} />
                }
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
}

export default ImageDataCard

const styles = StyleSheet.create({
    cardWrapper: {
        width: 300,
        backgroundColor: 'rgba(52, 52, 52, 0.5)',
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
        borderRadius: 75,
    },
})