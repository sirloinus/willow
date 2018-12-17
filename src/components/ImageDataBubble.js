import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'

const ImageDataBubble = ({ item, selectItem, selectedItem }) => {
    return (
        <TouchableOpacity
            onPress={() => selectItem(item)}
            style={selectedItem === item ? styles.selected : null}>
            <View style={styles.item}>
                <Text style={styles.balloon}>
                    {item.description}
                </Text>
                <Text style={styles.score}>
                    {(item.score * 100).toFixed(2) > 100 ? 100 : (item.score * 100).toFixed(2)} %
                </Text>
            </View>
        </TouchableOpacity>  
    )
}

export default ImageDataBubble

const styles = StyleSheet.create({
    item: {
        marginVertical: 14,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: "#eeeeee",
        borderRadius: 300,
        padding: 5,
        opacity: 0.5,
        alignSelf: 'flex-start'
    },
    balloon: {
        maxWidth: 250,
        padding: 15,
        borderRadius: 20,
    },
    score: {
        alignSelf: 'flex-end',
        margin: 15,
        fontSize: 12,
        color: "rgb(85, 107, 100)",
    },
    selected: {
        backgroundColor: 'yellow',

    }
})