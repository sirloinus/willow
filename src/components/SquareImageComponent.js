import React from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'

const SquareImageComponent = ({ item, handlePress }) => {
    return (
        <TouchableOpacity 
            style={styles.boxContainer}
            onPress={() => handlePress(item)}
        >
            <Image
                source={{ uri: `${item.photoUri}` }}
                defaultSource={require('../../assets/images/abhay-vyas-4071-unsplash.jpg')}
                style={styles.picture}
                resizeMode='cover'
            />
        </TouchableOpacity>
    )
}

export default SquareImageComponent

const styles = StyleSheet.create({
    boxContainer: {
        width: 120,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        padding: 5,
    },
    picture: {
        width: '100%',
        height: '100%',
        borderRadius: 10
    }
})