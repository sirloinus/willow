import React from 'react'
import { createStackNavigator } from 'react-navigation'

import MapScreen from '../screens/MapScreen'
import NavigationDrawerStructure from './NavigationDrawerStructure'

const MapScreenStackNavigator = createStackNavigator({
    Second: {
        screen: MapScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Map',
            headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
            headerTransparent: true,
            headerStyle: {
                // backgroundColor: 'white',
            },
            headerTintColor: '##fff',
        })
    }
})

export default MapScreenStackNavigator