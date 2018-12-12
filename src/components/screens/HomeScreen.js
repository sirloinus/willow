import React from 'react'
import { View, Text, StyleSheet, ImageBackground } from 'react-native'

class HomeScreen extends React.Component {

    render() {
        return (
            <ImageBackground source={require('../../../assets/images/caleb-woods-601935-unsplash.jpg')} style={styles.backgroundImage}>
                <View style={styles.container}>
                    <Text style={{fontSize: 23, color: 'white'}}>
                        HOME SCREEN
                    </Text>
                </View>
            </ImageBackground>
        )
    }
}

export default HomeScreen

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