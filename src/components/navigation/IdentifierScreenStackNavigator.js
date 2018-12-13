import React from 'react'
import { createStackNavigator } from 'react-navigation'

import IdentifierScreen from '../screens/IdentifierScreen'
import NavigationDrawerStructure from './NavigationDrawerStructure'
import CameraLens from '../Camera'
import LibraryScreen from '../screens/LibraryScreen'
import AnalysisScreen from '../screens/AnalysisScreen'

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
                title: '',
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
        },
        Analysis: {
            screen: AnalysisScreen,
            navigationOptions: ({ navigation }) => ({
                title: 'Analysing...',
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