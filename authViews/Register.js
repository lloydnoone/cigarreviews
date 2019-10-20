import React from 'react'
import axios from 'axios'

class Register extends React.Component {
  constructor() {
    super()

    this.state = {
      data: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    this.setState({ data })
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/register', this.state.data)
      .then(() => this.props.history.push('/'))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Register</h2>
        <label>Username</label>
        <input
          name='username'
          placeholder='Username'
          onChange={this.handleChange}
        />
        <label>Email</label>
        <input
          name='email'
          placeholder='name@email.com'
          onChange={this.handleChange}
        />
        <label>Password</label>
        <input
          name='password'
          placeholder='Password'
          type='password'
          onChange={this.handleChange}
        />
        <label>Password Confirmation</label>
        <input
          name='passwordConfirmation'
          placeholder='Password Confirmation'
          onChange={this.handleChange}
        />
        <button type='submit'>Register</button>
      </form>
    )
  }
}

export default Register