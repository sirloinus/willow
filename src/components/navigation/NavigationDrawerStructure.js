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
                        source={require('../../../assets/icons/menu.png')}
                        style={{ width: 50, height: 50, marginLeft: 10 }}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}

export default NavigationDrawerStructure
