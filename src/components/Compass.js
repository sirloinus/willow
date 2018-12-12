import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, Animated, Easing, Dimensions } from 'react-native'
import { Location, Permissions } from 'expo'

export default class Compass extends Component {
    constructor() {
        super()
        this.spinValue = new Animated.Value(0);
        this.state = {
            location: null,
            errorMessage: null,
            heading: null,
            truenoth: null
        };
    }

    componentDidMount() {
        this._getLocationAsync()
    }

    componentWillUpdate() {
        this.spin()
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION)
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            })
        }
        else {
            Expo.Location.watchHeadingAsync((obj) => {
                let heading = obj.magHeading
                this.setState({ heading: heading })
            })
        }
    }

    spin() {
        let start = JSON.stringify(this.spinValue)
        let heading = Math.round(this.state.heading)

        let rot = +start
        let rotM = rot % 360

        if (rotM < 180 && (heading > (rotM + 180)))
            rot -= 360
        if (rotM >= 180 && (heading <= (rotM - 180)))
            rot += 360

        rot += (heading - rotM)

        Animated.timing(
            this.spinValue,
            {
                toValue: rot,
                duration: 300,
                easing: Easing.easeInOut
            }
        ).start()
    }

    render() {
        let LoadingText = 'Loading...'
        let display = LoadingText

        if (this.state.errorMessage)
            display = this.state.errorMessage

        const spin = this.spinValue.interpolate({
            inputRange: [0, 360],
            outputRange: ['-0deg', '-360deg']
        })

        display = Math.round(JSON.stringify(this.spinValue))

        if (display < 0)
            display += 360
        if (display > 360)
            display -= 360


        return (
              <View style={styles.container}>
                <Text style={styles.text}>{display + '°'}</Text>
                <View style={styles.imageContainer} >
                    <Animated.Image resizeMode='contain' source={require('../../assets/images/sun.png')}
                        style={{
                            width: deviceWidth - 10, 
                            height: deviceHeight / 2 - 10,
                            left: deviceWidth / 2 - (deviceWidth - 10) / 1.05,     // change 1.05 value to move sun left/right
                            top: deviceHeight / 2 - (deviceHeight / 2 - 10) / 2,
                            transform: [{ rotate: spin }],
                        }} />
                </View>
                <View style={styles.arrowContainer} >
                    <Image resizeMode='contain' source={require('../../assets/images/arrow.png')} style={styles.arrow} />
                </View>
            </View>
        );
    }
}

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'rgb(254, 254, 254)',
        fontSize: 50,
        transform: ([{ translateY: -(deviceHeight / 2 - (deviceHeight / 2 - 10) / 2) - 50 }])
    },
    imageContainer: {
        ...StyleSheet.absoluteFillObject,
    },
    arrowContainer: {
        ...StyleSheet.absoluteFillObject,
    },
    arrow: {
        width: deviceWidth / 5,
        height: deviceWidth / 5,
        left: deviceWidth / 2 - (deviceWidth / 1.8),     // change 1.8 value to move arrow left/right
        top: deviceHeight / 2 - (deviceWidth / 5) / 2,
        opacity: 0.9
    },
})