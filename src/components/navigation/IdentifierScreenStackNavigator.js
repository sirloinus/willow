import React from 'react'
import { createStackNavigator } from 'react-navigation'

import IdentifierScreen from '../screens/IdentifierScreen'
import NavigationDrawerStructure from './NavigationDrawerStructure'

const IdentifierScreenStackNavigator = createStackNavigator({
    Second: {
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
    }
})

export default IdentifierScreenStackNavigator