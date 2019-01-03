import React from 'react'
import { Image } from 'react-native'

class Header extends React.Component {
  render() {
    return (
      <Image
        source={require('../../../assets/icons/willowicon.png')}
        style={{ width: 90, height: 90, marginTop: 10 }}
      />
    )
  }
}        

export default Header