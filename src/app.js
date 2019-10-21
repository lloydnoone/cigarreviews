import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import '../src/style.scss'

import Home from '../common/Home'
import Navbar from '../common/Navbar'
import CigarIndex from '../cigarViews/CigarIndex'
import CigarShow from '../cigarViews/CigarShow'
import CigarNew from '../cigarViews/CigarNew'
import CigarEdit from '../cigarViews/CigarEdit'
import Register from '../authViews/Register'
import Login from '../authViews/Login'

import LocalAuth from '../lib/localAuth'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout(){
    console.log('should log out')
    LocalAuth.logout()
    this.props.history.push('/')
  }

  render() {
    return (
      <BrowserRouter>
        <main>
          <Navbar/>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/cigars/:id/edit" component={CigarEdit} />
            <Route exact path="/cigars/new" component={CigarNew} />
            <Route exact path="/cigars/:id" component={CigarShow} />
            <Route exact path="/cigars" component={CigarIndex} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </main>
      </BrowserRouter>
    )
  }

}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)