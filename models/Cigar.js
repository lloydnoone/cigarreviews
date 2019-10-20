const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
})

const cigarSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  strength: { type: String, required: true },
  gauge: { type: Number, required: true, min: 32, max: 52 },
  origin: { type: String, required: true },
  comments: [ commentSchema ],
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
})

cigarSchema.plugin(require('mongoose-unique-validator'))

module.exports = mongoose.model('Cigar', cigarSchema)