import React from 'react'
import { createDrawerNavigator } from 'react-navigation'
import HomeScreenStackNavigator from './HomeScreenStackNavigator';
import CompassScreenStackNavigator from './CompassScreenStackNavigator';
import MapTabNavigator from './MapTabNavigator';
import IdentifierTabNavigator from './IdentifierTabNavigator';

const DrawerNavigator = createDrawerNavigator (
    {
        Home: { screen: HomeScreenStackNavigator },
        Map: { screen: MapTabNavigator },
        Identifier: { screen: IdentifierTabNavigator },
        Compass: { screen: CompassScreenStackNavigator }
    }, {
        drawerBackgroundColor: 'rgba(0, 0, 0, 0.1)',
        drawerWidth: 250,
        contentOptions: {
            activeTintColor: '#ffffff',
            inactiveTintColor: '#ffffff',
            activeBackgroundColor: 'rgb(92, 162, 111)',
            inactiveBackgroundColor: 'transparent',
            itemsContainerStyle: {
                marginTop: 38
            },
            itemStyle: {
                marginTop: 0
            },
            labelStyle: {
                fontSize: 14,
            }
        }
    }
)

export default DrawerNavigator 