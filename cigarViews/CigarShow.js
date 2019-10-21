import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import LocalAuth from '../lib/localAuth'
import Comments from '../common/Comments'

class CigarShow extends React.Component {
  constructor() {
    super()

    this.state = {
      cigar: null,
      text: '',
      comments: []
    }
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    const cigarId = this.props.match.params.id //only need this reference once
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

  isOwner() {
    return LocalAuth.getPayload().sub === this.state.cigar.user._id
  }

  render() {
    if (!this.state.cigar) return null
    const { cigar } = this.state
    return (
      <div className='showWrapper'>
        <div className='imgAndInfo'>
          <img src={cigar.image} alt={cigar.name} />
          <div className='panelWrapper'>
            <div>
              <h1>{cigar.name}</h1>
              <p>Strength: {cigar.strength}</p>
              <p>Gauge: {cigar.gauge}</p>
              <p>Origin: {cigar.origin}</p>
              <p>Posted by: {cigar.user.username}</p>
            </div>
            <div>
              {this.isOwner() &&
                <>
                  <Link to={`/cigars/${cigar._id}/edit`}>
                    <button>Edit cigar</button>
                  </Link>
                  <button onClick={this.handleDelete}>Delete cigar</button>
                </>
              }
            </div>
          </div>
        </div>
        <h2>Comments</h2>
        <Comments cigar={this.state.cigar} comments={this.state.cigar.comments}/*userId={this.state.cigar.user._id}*//>
      </div>
    )
  }
}

export default CigarShow