const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/cigars'
const port = process.env.PORT || 4000
const secret = process.env.SECRET || 'Shhhh it\'s a secret'

module.exports = { dbURI, port, secret }