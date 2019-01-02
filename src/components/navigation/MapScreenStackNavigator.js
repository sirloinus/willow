import React from 'react'
import { createStackNavigator } from 'react-navigation'

import MapScreen from '../screens/MapScreen'
import NavigationDrawerStructure from './NavigationDrawerStructure'
import LocationsScreen from '../screens/LocationsScreen';

const MapScreenStackNavigator = createStackNavigator({
    Second: {
        screen: MapScreen,
        navigationOptions: ({ navigation }) => ({
            // title: 'Map',
            headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
            headerTransparent: true,
            headerStyle: {
                // backgroundColor: 'white',
            },
            headerTintColor: '#fff',
        })
    },
    // Locations: {
    //     screen: LocationsScreen,
    //     navigationOptions: ({ navigation }) => ({
    //         title: '',
    //         headerTransparent: true,
    //         headerTintColor: '#fff',
    //     })
    // }
},
    {
        initialRouteName: "Second"
    }
)

export default MapScreenStackNavigator