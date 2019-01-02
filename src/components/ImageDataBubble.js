import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'

class ImageDataBubble extends React.Component {
    render() {
        const { item, selectItem, selectedItem, selectedItems } = this.props
        const selectItemHandler = selectItem ? () => selectItem(item) : null
        const newStyles = (selectedItems.length && selectedItems.includes(item)) && styles.selected
        const newStylesText = (selectedItems.length && selectedItems.includes(item) && styles.selectedText)
        // const newStylesText = (selectedItems.length && selectedItems.find(el => el.description === item.description)) && styles.selectedText

        return (
            <TouchableOpacity
                onPress={selectItemHandler}>
                <View style={{ ...styles.item, ...newStyles}}>
                    <Text style={{...styles.balloon, ...newStylesText}}>
                        {item.description}
                    </Text>
                    <Text style={{...styles.score, ...newStylesText}}>
                        {(item.score * 100).toFixed(2) > 100 ? 100 : (item.score * 100).toFixed(2)} %
                    </Text>
                </View>
            </TouchableOpacity>  
        )
    }
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
        borderRadius: 20
    },
    selected: {
        backgroundColor: '#5c9d8e',
        opacity: 0.8
    },
    selectedText: {
    color: '#eeeeee'
    }
})