import React, { Component } from 'react'
import { Menu, Icon } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import '../App.css'
import logo from '../icons/reactLogo.svg'

export default class MenuExampleStackable extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  goToGitHub = () => {
    console.log('GITHUB')
  }

  render() {
    const { activeItem } = this.state

    return (
      <Menu inverted>
        <Menu.Item>
          <img src={logo} className="App-logo" alt="logo" />
        </Menu.Item>
        <Link exact to="/">
          <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
        </Link>
        <Link to="/search">
          <Menu.Item name='search'
            active={activeItem === 'search'} onClick={this.handleItemClick} />
        </Link>
        {/*tried to use Link here as well, though without success */}
        <Menu.Item className='right' icon='code' active={activeItem === 'code'}
            onClick={this.goToGitHub} >
            <a target="_blank" href="https://github.com/psatler/myReads_React">
              <Icon name='code' />
            </a>
        </Menu.Item>
      </Menu>
    )
  }
}
