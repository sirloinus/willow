import React from 'react'
import { createBottomTabNavigator } from 'react-navigation'

import LocationsScreen from '../screens/LocationsScreen'
import MapScreenStackNavigator from './MapScreenStackNavigator'

const MapTabNavigator = createBottomTabNavigator(
    {
        Map: { screen: MapScreenStackNavigator },
        Locations: { screen: LocationsScreen }
    }, {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state
            }
        }),
        tabBarOptions: {
            activeTintColor: 'rgb(0, 196, 124)',
            inactiveTintColor: 'white',
            labelStyle: {
                fontSize: 15,
            },
            
            style: {
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                // borderTopWidth: 3,
                // borderTopColor: 'rgb(92, 162, 111)',
                // position: 'absolute',  
                left: 0,
                right: 0,
                bottom: 0
            },
            tabStyle: {
                margin: 15,
            }
        }
    }
)

export default MapTabNavigator