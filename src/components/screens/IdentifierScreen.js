import React from 'react'
import { View, Text, StyleSheet, ImageBackground, Button } from 'react-native'

class IdentifierScreen extends React.Component {

    render() {
        return (
            <ImageBackground source={require('../../../assets/images/samuel-ferrara-149242-unsplash.jpg')} style={styles.backgroundImage}>
                <View style={styles.container}>
                    <Text style={{ fontSize: 23, color: '#fff' }}>
                        IDENTIFIER SCREEN
                    </Text>
                    <Button
                        title="Go to Camera"
                        onPress={() => this.props.navigation.navigate('Camera')}
                        style={styles.button}
                    />
                    <Button
                        title="View Library"
                        onPress={() => this.props.navigation.navigate('Library')}
                        style={styles.button}                   
                    />
                </View>
            </ImageBackground>
        )
    }
}

export default IdentifierScreen

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
    },
    button: {
        color: 'white', 
    }
})