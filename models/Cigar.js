const mongoose = require('mongoose')
const Comment = require('../models/Comments')

const cigarSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  strength: { type: String, required: true },
  gauge: { type: Number, required: true, min: 32, max: 52 },
  origin: { type: String, required: true },
  image: { type: String, required: true },
  comments: [ Comment.schema ],
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
})

cigarSchema.plugin(require('mongoose-unique-validator'))

module.exports = mongoose.model('Cigar', cigarSchema)