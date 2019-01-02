import React from 'react'
import { StyleSheet, AsyncStorage } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { withAuthenticator } from 'aws-amplify-react-native'
import { Auth } from 'aws-amplify'
import Amplify from '@aws-amplify/core'
import config from './aws-exports'
Amplify.configure(config)

import DrawerNavigator from './src/components/navigation/DrawerNavigator'

class App extends React.Component {

  state={
    username: ''
  }

  async componentDidMount() {
    try {
      const user = await Auth.currentAuthenticatedUser()
      console.log(user)
      const username = user.username
      await AsyncStorage.setItem('Username', username)
    } catch(error) {
      console.log(error)
    }
  }

  render() {
    return (
      <AppContainer/>
    )
  }
}

const AppContainer = createAppContainer(DrawerNavigator)

export default withAuthenticator(App, { includeGreetings: true })

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  }
})