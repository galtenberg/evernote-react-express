import React, { Component } from 'react'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import './style.css'

import Notebooks from '../Notes/Notebooks'

const { fetchCred } = require('../../../config/config')

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { loggedIn: 'unknown' }
  }

  async componentWillMount() {
    const response = await fetch('/isLoggedIn', fetchCred)
    this.setState({ loggedIn: await response.json() })
  }

  componentWillUnmount() {
    this.setState({ loggedIn: 'unknown' })
  }

  render() {
    var authButton
    if (this.state.loggedIn) {
      authButton = <Link to='authout'><button>Logout</button></Link>
    } else {
      authButton = <Link to='auth'><button>Login</button></Link>
    }

    return (
      <div className={classnames('App', this.props.className)}>
        {authButton}
        <div>Logged In {JSON.stringify(this.state.loggedIn)}</div>
        {/*<button onClick={this.props.actions.expressTest}>Test if Express is working (see console for result)</button>*/}

        <Notebooks/>
      </div>
    )
  }
}

export default App
