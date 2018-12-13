import React from 'react'
import { createDrawerNavigator } from 'react-navigation'
import HomeScreenStackNavigator from './HomeScreenStackNavigator';
import MapScreenStackNavigator from './MapScreenStackNavigator';
import IdentifierScreenStackNavigator from './IdentifierScreenStackNavigator';
import CompassScreenStackNavigator from './CompassScreenStackNavigator';

const DrawerNavigator = createDrawerNavigator (
    {
        Home: { screen: HomeScreenStackNavigator },
        Map: { screen: MapScreenStackNavigator },
        Identifier: { screen: IdentifierScreenStackNavigator },
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