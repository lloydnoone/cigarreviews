import React from 'react'
import axios from 'axios'

class CigarNew extends React.Component {
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

  handleChange(e) {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    //make errors blank initially
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ data, errors })
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/cigars', this.state.data)
      .then(res => console.log(res.data))
      .then(res => this.props.history.push(`/cigars/${res.data._id}`))
      .catch(err => this.setState({ errors: err.message }))
  }

  render() {
    const { data: { name, strength, gauge, origin } } = this.state
    console.log('name: ', name)
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="field">
          <label>Name</label>
          <input
            placeholder="Name"
            name="name"
            onChange={this.handleChange}
            vslue={name}
          />
        </div>
        <div className="field">
          <label>Strength</label>
          <input
            placeholder="Strength"
            name="strength"
            onChange={this.handleChange}
            vslue={strength}
          />
        </div>
        <div className="field">
          <label>gauge</label>
          <input
            placeholder="Gauge"
            name="gauge"
            onChange={this.handleChange}
            vslue={gauge}
          />
        </div>
        <div className="field">
          <label>Origin</label>
          <input
            placeholder="Origin"
            name="origin"
            onChange={this.handleChange}
            vslue={origin}
          />
        </div>
        <button type="submit">
          submit
        </button>
      </form>
    )
  }
}

export default CigarNew