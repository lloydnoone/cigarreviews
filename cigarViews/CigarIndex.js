import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class CigarIndex extends React.Component {
  constructor() {
    super()

    this.state = {
      cigars: null
    }
  }

  componentDidMount() {
    axios.get('/api/cigars')
      .then(res => this.setState({ cigars: res.data }))
      .catch(err => console.log(err))
  }

  render() {
    console.log(this.state)
    if (!this.state.cigars) return null
    return (
      <div>
        <h1>Cigar Index</h1>
        {this.state.cigars.map(cigar => (
          <Link key={cigar.name} to={`/cigars/${cigar._id}`}>
            <div>
              <h2>{cigar.name}</h2>
              <p>{cigar.strength}</p>
              <p>{cigar.gauge}</p>
              <p>{cigar.origin}</p>
              <p>{cigar.user.username}</p>
            </div>
          </Link>
        ))}
        <Link to={'/cigars/new'}>
          Add cigar
        </Link>
      </div>
    )
  }
}

export default CigarIndex