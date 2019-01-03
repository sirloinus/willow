import React from 'react'
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native'
import { Font } from 'expo'

class HomeScreen extends React.Component {

    render() {
        return (
            <ImageBackground source={require('../../../assets/images/caleb-woods-601935-unsplash.jpg')} style={styles.backgroundImage}>
                {/* <Image
                    source={require('../../../assets/icons/willow.png')}
                    style={{ width: 90, height: 90, marginTop: 10 }}
                /> */}
                <View style={styles.container}>
                    <Text style={{fontFamily: 'comfortaa-bold', fontSize: 22, color: 'white'}}>
                        Welcome back, Amalie.
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
        backgroundColor: 'black'
    }
})