import React, { Component } from 'react'
import { Menu, Icon } from 'semantic-ui-react'
import '../App.css'
import logo from '../icons/reactLogo.svg'

export default class MenuExampleStackable extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu inverted>
        <Menu.Item>
          <img src={logo} className="App-logo" alt="logo" />
        </Menu.Item>
        <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
        <Menu.Item name='messages' active={activeItem === 'messages'} onClick={this.handleItemClick} />
        <Menu.Item name='friends' active={activeItem === 'friends'} onClick={this.handleItemClick} />
        <Menu.Item className='right' icon='code' active={activeItem === 'code'}
          onClick={this.handleItemClick}>
          {/* <Icon name='code' /> */}
        </Menu.Item>

      </Menu>
    )
  }
}
