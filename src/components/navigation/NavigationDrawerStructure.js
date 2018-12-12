import React from 'react'
import { View, TouchableOpacity, Image } from 'react-native'

class NavigationDrawerStructure extends React.Component {

    toggleDrawer = () => {
        this.props.navigationProps.toggleDrawer()
    }

    render() {
        const { toggleDrawer } = this
        return (
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={toggleDrawer}>

                    <Image
                        source={require('../../../assets/images/home.png')}
                        style={{ width: 80, height: 80, marginLeft: 5 }}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}

export default NavigationDrawerStructure
