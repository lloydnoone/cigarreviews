import React from 'react'
import axios from 'axios'
import LocalAuth from '../lib/localAuth'

class Comments extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      text: '',
      comments: []
    }
    this.handleDeleteComment = this.handleDeleteComment.bind(this)
    this.handleSubmitComment = this.handleSubmitComment.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    axios.get(`/api/cigars/${this.props.cigarId}/comments`)
      .then(res => this.setState({ comments: res.data }))
      .catch(err => console.log(err))
  }

  handleDeleteComment(e, commentId) {
    e.preventDefault()
    const cigarId = this.props.cigarId
    axios.delete(`/api/cigars/${cigarId}/comments/${commentId}`, {
      headers: { Authorization: `Bearer ${LocalAuth.getToken()}` }
    })
      .then((res) => {
        const commentsArr = [...res.data.comments]
        this.setState({ comments: commentsArr })
      })
      .catch(err => console.log(err))
  }

  handleSubmitComment(e) {
    e.preventDefault()
    const cigarId = this.props.cigarId
    axios.post(`/api/cigars/${cigarId}/comments`, { text: this.state.text }, {
      headers: { Authorization: `Bearer ${LocalAuth.getToken()}` }
    })
      .then((res) => { 
        const commentsArr = [...res.data.comments]
        this.setState({ comments: commentsArr })
      })
      .catch(err => console.log('error: ', err))
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  isOwner() {
    return LocalAuth.getPayload().sub === this.props.userId
  }

  render() {
    return (
      <>
        {this.state.comments && this.state.comments.map(comment => (
          <div className='panelWrapper' key={comment._id}>
            <div>{comment.text}</div>
            {this.isOwner() && <button onClick={(e) => this.handleDeleteComment(e, comment._id)}>delete</button>}
          </div>
        ))}
        {this.isOwner() && 
          <form className='panelWrapper' onSubmit={this.handleSubmitComment}>
            <textarea
              rows='4'
              cols='5'
              type='textarea'
              placeholder="Comment"
              name="text"
              onChange={this.handleChange}
              value={this.state.text}
            />
            <button type='submit'>Add comment</button>
          </form>
        }
      </>
    )
  }
}

export default Comments