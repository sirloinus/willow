import React from 'react'
import { StyleSheet } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { Font, AppLoading } from 'expo'

import DrawerNavigator from './src/components/navigation/DrawerNavigator'

class App extends React.Component {

  state = {
    fontLoaded: false,
  }

  async componentDidMount() {
    await Font.loadAsync({
      'comfortaa-light': require('./assets/fonts/Comfortaa-Light.ttf'),
      'comfortaa-regular': require('./assets/fonts/Comfortaa-Regular.ttf'),
      'comfortaa-bold': require('./assets/fonts/Comfortaa-Bold.ttf'),
    })
    this.setState({ fontLoaded: true })
  }

  render() {
    const {fontLoaded} = this.state

    if (fontLoaded) {
      return (
        <AppContainer/>
      )
    } else {
      return (
        <AppLoading/>
      )
    }
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