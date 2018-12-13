import React from 'react'
import { StyleSheet } from 'react-native'
import { createAppContainer } from 'react-navigation'

import DrawerNavigator from './src/components/navigation/DrawerNavigator'

class App extends React.Component {
  render() {
    return (
      <AppContainer/>
    )
  }
}

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