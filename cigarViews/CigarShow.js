import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import LocalAuth from '../lib/localAuth'

class CigarShow extends React.Component {
  constructor() {
    super()

    this.state = {
      cigar: null
    }
    this.handleDelete = this.handleDelete.bind(this)
    this.handleSubmitComment = this.handleSubmitComment.bind(this)
  }

  componentDidMount() {
    const cigarId = this.props.match.params.id
    axios.get(`/api/cigars/${cigarId}`)
      .then(res => this.setState({ cigar: res.data }))
      .catch(err => console.log(err))
  }

  handleDelete() {
    const cigarId = this.props.match.params.id
    axios.delete(`/api/cigars/${cigarId}`, {
      headers: { Authorization: `Bearer ${LocalAuth.getToken()}` }
    })
      .then(() => this.props.history.push('/cigars'))
      .catch(err => console.log(err))
  }

  handleSubmitComment() {
    
  }

  isOwner() {
    return LocalAuth.getPayload().sub === this.state.cigar.user._id
  }

  render() {
    if (!this.state.cigar) return null
    const { cigar } = this.state
    return (
      <div>
        <h1>{cigar.name}</h1>
        <p>{cigar.strength}</p>
        <p>{cigar.gauge}</p>
        <p>{cigar.origin}</p>
        {this.isOwner() && 
          <>
            <Link to={`/cigars/${cigar._id}/edit`}>
              Edit this cigar
            </Link>
            <button onClick={this.handleDelete}>Delete this cigar</button>
          </>
        }
      </div>
    )
  }
}

export default CigarShow