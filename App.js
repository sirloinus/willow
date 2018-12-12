import React from 'react'
import { StyleSheet } from 'react-native'
import { createDrawerNavigator, createAppContainer } from 'react-navigation'

import HomeScreenStackNavigator from './src/components/navigation/HomeScreenStackNavigator'
import MapScreenStackNavigator from './src/components/navigation/MapScreenStackNavigator'
import BadgesScreenStackNavigator from './src/components/navigation/BadgesScreenStackNavigator';
import CompassScreenStackNavigator from './src/components/navigation/CompassScreenStackNavigator'

class App extends React.Component {
  render() {
    return (
      <AppContainer/>
    )
  }
}

const DrawerNavigator = createDrawerNavigator (
  {
    Home: { screen: HomeScreenStackNavigator },
    Map: { screen: MapScreenStackNavigator },
    Badges: { screen: BadgesScreenStackNavigator },
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
})

const AppContainer = createAppContainer(DrawerNavigator)

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  }
})