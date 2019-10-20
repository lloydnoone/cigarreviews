import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'

import Home from '../common/Home'
import CigarIndex from '../cigarViews/CigarIndex'
import CigarShow from '../cigarViews/CigarShow'
import CigarNew from '../cigarViews/CigarNew'
import CigarEdit from '../cigarViews/CigarEdit'
import Register from '../authViews/Register'
import Login from '../authViews/Login'

const App = () => (
  <BrowserRouter>
    <main>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/register'>Create Account</Link>
        <Link to='/login'>Log In</Link>
        <Link to='/cigars'>Index</Link>
      </nav>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/cigars/:id/edit" component={CigarEdit}/>
        <Route exact path="/cigars/new" component={CigarNew}/>
        <Route exact path="/cigars/:id" component={CigarShow}/>
        <Route exact path="/cigars" component={CigarIndex}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/login" component={Login}/>
      </Switch>
    </main>
    
  </BrowserRouter>
  
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

