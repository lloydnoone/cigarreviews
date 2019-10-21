import React from 'react'
import { Link } from 'react-router-dom'

const CigarCard = ({ _id, image, name, strength, gauge, origin, user }) => (
  <Link to={`/cigars/${_id}`}>
    <div className='cigarCard'>
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <p>Strength: {strength}</p>
      <p>Guage: {gauge}</p>
      <p>Origin: {origin}</p>
      <p>Posted by: {user.username}</p>
    </div>
  </Link>
)

export default CigarCard
