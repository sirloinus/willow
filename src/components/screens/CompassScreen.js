import React from 'react'
import { View, StyleSheet, ImageBackground } from 'react-native'
import Compass from '../Compass';


class CompassScreen extends React.Component {

    render() {
        return (
            <ImageBackground source={require('../../../assets//images/annie-spratt-160768-unsplash.jpg')} style={styles.backgroundImage}>
                {/* <View style={styles.container}> */}
                    <Compass/>
                {/* </View> */}
            </ImageBackground>
        )
    }
}

export default CompassScreen

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    }
})