import React from 'react'
import { createStackNavigator } from 'react-navigation'

import IdentifierScreen from '../screens/IdentifierScreen'
import NavigationDrawerStructure from './NavigationDrawerStructure'
import FakeCam from '../FakeCam';

const IdentifierScreenStackNavigator = createStackNavigator({
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
    FakeCam: {
        screen: FakeCam
    }},
    {
        initialRouteName: "Third"
    }
)

export default IdentifierScreenStackNavigator