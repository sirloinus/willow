import React from 'react'
import { createStackNavigator } from 'react-navigation'

import IdentifierScreen from '../screens/IdentifierScreen'
import NavigationDrawerStructure from './NavigationDrawerStructure'
import CameraLens from '../Camera'
import LibraryScreen from '../screens/LibraryScreen'

const IdentifierScreenStackNavigator = createStackNavigator(
    {
        Third: {
            screen: IdentifierScreen,
            navigationOptions: ({ navigation }) => ({
                title: 'Identifier',
                headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
                headerTransparent: true,
                headerStyle: {
                    // backgroundColor: 'white'
                },
                headerTintColor: '#fff',
            })
        },
        Camera: {
            screen: CameraLens,
            navigationOptions: ({ navigation }) => ({
                title: 'Camera',
                headerTransparent: true,
                headerTintColor: '#fff',
            })
        }, 
        Library: {
            screen: LibraryScreen,
            navigationOptions: ({ navigation }) => ({
                title: 'Library',
                headerTransparent: true,
                headerTintColor: '#fff',
            })
        }
    },
    {
        initialRouteName: "Third"
    }
)

export default IdentifierScreenStackNavigator