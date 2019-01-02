import React from 'react'
import { createBottomTabNavigator } from 'react-navigation'

import IdentifierScreenStackNavigator from './IdentifierScreenStackNavigator'
import LibraryScreen from '../screens/LibraryScreen'

const IdentifierTabNavigator = createBottomTabNavigator(
    {
        Camera: { screen: IdentifierScreenStackNavigator },
        Library: { screen: LibraryScreen }
    }, {
        navigationOptions: ({ navigation }) => {
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state
            }
        },
        tabBarOptions: {
            activeTintColor: 'rgb(0, 196, 124)',
            inactiveTintColor: 'white',
            labelStyle: {
                fontSize: 15
            },
            style: {
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                // borderTopWidth: 3,
                // borderTopColor: 'rgb(92, 162, 111)',
                // position: 'absolute',  
                left: 0,
                right: 0,
                bottom: 0,
            },
            tabStyle: {
                margin: 15,
            }
        }
    }
)

export default IdentifierTabNavigator