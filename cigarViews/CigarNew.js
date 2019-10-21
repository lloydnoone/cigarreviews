import React from 'react'
import axios from 'axios'
import LocalAuth from '../lib/localAuth'

class CigarNew extends React.Component {
  constructor() {
    super()

    this.state = {
      data: {
        name: '',
        strength: '',
        gauge: '',
        origin: '',
        image: ''
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
    axios.post('/api/cigars', this.state.data, {
      headers: { Authorization: `Bearer ${LocalAuth.getToken()}` }
    })
      .then(res => this.props.history.push(`/cigars/${res.data._id}`))
      .catch(err => this.setState({ errors: err.message }))
  }

  render() {
    const { data: { name, strength, gauge, origin, image } } = this.state
    return (
      <div className='formWrapper'>
        <form className='panelWrapper' onSubmit={this.handleSubmit}>
          <h2>New Cigar</h2>
          <label>Name</label>
          <input
            placeholder="Name"
            name="name"
            onChange={this.handleChange}
            value={name}
          />
          <label>Strength</label>
          <input
            placeholder="Strength"
            name="strength"
            onChange={this.handleChange}
            value={strength}
          />
          <label>gauge</label>
          <input
            placeholder="Gauge"
            name="gauge"
            onChange={this.handleChange}
            value={gauge}
          />
          <label>Origin</label>
          <input
            placeholder="Origin"
            name="origin"
            onChange={this.handleChange}
            value={origin}
          />
          <label>Image URL</label>
          <input
            placeholder='Image URL'
            name='image'
            onChange={this.handleChange}
            value={image}
          />
          <button type="submit">
            submit
          </button>
        </form>
      </div>
    )
  }
}

export default CigarNew