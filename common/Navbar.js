import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import LocalAuth from '../lib/localAuth'

class Navbar extends React.Component {
  constructor() {
    super()

    this.state = {

    }
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout() {
    LocalAuth.logout()
    this.props.history.push('/')
  }

  render() {
    return (
      <nav>
        <Link to='/'>Home</Link>
        {!LocalAuth.isAuthenticated() && <Link to='/register'>Create Account</Link>}
        {!LocalAuth.isAuthenticated() && <Link to='/login'>Log In</Link>}
        {LocalAuth.isAuthenticated() && <Link to='/cigars/new'>Add Cigar</Link>}
        {LocalAuth.isAuthenticated() && <a onClick={this.handleLogout}>Sign Out</a>}
        <Link to='/cigars'>Index</Link>
      </nav>
    )
  }
}

export default withRouter(Navbar) 