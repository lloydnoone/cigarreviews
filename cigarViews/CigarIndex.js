import React from 'react'
import axios from 'axios'

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
      <div className='indexWrapper'>
        {this.state.cigars.map(cigar => (
          <CigarCard key={cigar.name} {...cigar} />
        ))}
      </div>
    )
  }
}

export default CigarIndex