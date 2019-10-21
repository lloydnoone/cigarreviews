import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import CigarCard from '../common/CigarCard'

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
      <>
        <h1>Cigars</h1>
        <Link to={'/cigars/new'}>
            Add cigar
        </Link>
        <div className='indexWrapper'>
          {this.state.cigars.map(cigar => (
            <CigarCard key={cigar.name} {...cigar}/>
          ))}
        </div>
      </>
    )
  }
}

export default CigarIndex