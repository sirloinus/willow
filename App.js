import React from 'react'
import { StyleSheet } from 'react-native'
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
      const username = user.username
      this.setState({ username })
    } catch(error) {
      console.log(error)
    }
  }

  render() {
    const { username } = this.state
    console.log(username)
    return (
      <AppContainer username={username}/>
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