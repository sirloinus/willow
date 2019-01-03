import React from 'react'
import { createStackNavigator } from 'react-navigation'

import HomeScreen from '../screens/HomeScreen'
import NavigationDrawerStructure from './NavigationDrawerStructure'
import Header from '../common/Header';

const HomeScreenStackNavigator = createStackNavigator({
    First: {
        screen: HomeScreen,
        navigationOptions: ({ navigation }) => ({
            title: '',
            headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
            headerTransparent: true,
            headerStyle: {
                // backgroundColor: 'white',
            },
            headerTintColor: '#fff',
            headerTitle: <Header/>
        })
    }
})

export default HomeScreenStackNavigator