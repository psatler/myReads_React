import React, { Component } from 'react'
import { Menu, Icon } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import '../App.css'
import logo from '../icons/reactLogo.svg'

export default class MenuExampleStackable extends Component {
  // state = { activeItem: '' }
  // handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    // const { activeItem } = this.state

    return (
      <Menu inverted>
        <Menu.Item>
          <img src={logo} className="App-logo" alt="logo" />
        </Menu.Item>
        <Link to="/">
          <Menu.Item name='home'  />
        </Link>
        <Link to="/search">
          <Menu.Item name='search' />
        </Link>
        {/*tried to use Link here as well, though without success */}
        <Menu.Item className='right' >
            <a target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/psatler/myReads_React">
              <Icon name='code' />
            </a>
        </Menu.Item>
      </Menu>
    )
  }
}
