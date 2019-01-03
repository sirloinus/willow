import React from 'react'

class Header extends React.Component {
  render() {
    return (
      <Image
        source={require('../../../assets/icons/willow.png')}
        style={{ width: 90, height: 90, marginTop: 10 }}
      />
    )
  }
}        

export default Header