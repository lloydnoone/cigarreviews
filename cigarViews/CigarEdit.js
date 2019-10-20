import React from 'react'
import axios from 'axios'
import LocalAuth from '../lib/localAuth'

class CigarEdit extends React.Component {
  constructor() {
    super()

    this.state = {
      data: {
        name: '',
        strength: '',
        gauge: '',
        origin: ''
      }
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const cigarId = this.props.match.params.id
    axios.get(`/api/cigars/${cigarId}`)
      .then(res => this.setState({ data: res.data }))
      .catch(err => console.log(err))
  }

  handleChange(e) {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    //make errors blank initially
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ data, errors })
  }

  handleSubmit(e) {
    e.preventDefault()
    const cigarId = this.props.match.params.id
    axios.put(`/api/cigars/${cigarId}`, this.state.data, {
      headers: { Authorization: `Bearer ${LocalAuth.getToken()}` }
    })
      .then(res => this.props.history.push(`/cigars/${res.data._id}`))
      .catch(err => this.setState({ errors: err.message }))
  }

  render() {
    const { data: { name, strength, gauge, origin } } = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="field">
          <label>Name</label>
          <input
            placeholder="Name"
            name="name"
            onChange={this.handleChange}
            value={name}
          />
        </div>
        <div className="field">
          <label>Strength</label>
          <input
            placeholder="Strength"
            name="strength"
            onChange={this.handleChange}
            value={strength}
          />
        </div>
        <div className="field">
          <label>gauge</label>
          <input
            placeholder="Gauge"
            name="gauge"
            onChange={this.handleChange}
            value={gauge}
          />
        </div>
        <div className="field">
          <label>Origin</label>
          <input
            placeholder="Origin"
            name="origin"
            onChange={this.handleChange}
            value={origin}
          />
        </div>
        <button type="submit">
          submit
        </button>
      </form>
    )
  }
}

export default CigarEdit