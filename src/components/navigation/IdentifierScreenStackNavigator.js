import React from 'react'
import { createStackNavigator } from 'react-navigation'

import NavigationDrawerStructure from './NavigationDrawerStructure'
import CameraLens from '../Camera'
import LibraryScreen from '../screens/LibraryScreen'
import AnalysisScreen from '../screens/AnalysisScreen'
import ImageDetailsScreen from '../screens/ImageDetailsScreen';

const IdentifierScreenStackNavigator = createStackNavigator(
    {
        Camera: {
            screen: CameraLens,
            navigationOptions: ({ navigation }) => ({
                title: '',
                headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
                headerStyle: {
                    // backgroundColor: 'white'
                },
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
        },
        Details: {
            screen: ImageDetailsScreen,
            navigationOptions: ({ navigation }) => ({
                title: 'Details',
                headerTransparent: true,
                headerTintColor: '#fff',
            })   
        }
    },
    {
        initialRouteName: "Camera"
    }
)

export default IdentifierScreenStackNavigator