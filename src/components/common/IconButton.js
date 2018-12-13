
import React from 'react'
import { TouchableHighlight, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

const IconButton = props => {

    let icon_name = props.icon ? props.icon : 'add'
    let color = props.color ? props.color : '#eee'
    let icon_size = props.size ? props.size : 35

    return (
        <TouchableHighlight style={styles.icon_button} underlayColor="#ccc" onPress={() => {}}>
            <MaterialIcons name={icon_name} size={icon_size} color={color} />
        </TouchableHighlight>
    )
}

export default IconButton

const styles = StyleSheet.create({
    icon_button: {
        padding: 5
    }
})