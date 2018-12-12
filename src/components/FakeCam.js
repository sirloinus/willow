import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

class FakeCam extends React.Component {

    render() {
        return (
               <View style={styles.container}>
                    <Text style={{ fontSize: 23, color: 'white' }}>
                        FAKE CAM
                    </Text>
                </View>
            
        )
    }
}

export default FakeCam

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
    }
})