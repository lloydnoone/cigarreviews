const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const { dbURI, port } = require('./config/environment')
const logger = require('./lib/logger')
const errorHandler = require('./lib/errorHandler')
const router = require('./config/router')

mongoose.connect(
  dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => console.log('connected!!!')
)

//app.use(cors())

app.use(express.static(`${__dirname}/dist`))

app.use(bodyParser.json())

app.use(logger)

app.use('/api', router)

app.use(errorHandler)

app.get('/*', (req, res) => res.status(404).json({ message: 'Route not found' }))

app.listen(port, () => console.log(`app is listening on port ${port}`))

