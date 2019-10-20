const mongoose = require('mongoose')
const { dbURI } = require('../config/environment')
const Cigar = require('../models/Cigar')
const User = require('../models/User')

mongoose.connect(
  dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err, db) => {
    if (err) return console.log(err)
    db.dropDatabase()
      .then(() => {
        return User.create([
          {
            username: 'Lloyd',
            email: 'lloyd@email.com',
            password: 'pass',
            passwordConfirmation: 'pass'
          },
          {
            username: 'OtherLloyd',
            email: 'otherlloyd@email.com',
            password: 'pass',
            passwordConfirmation: 'pass'
          },
          {
            username: 'LastLloyd',
            email: 'lastlloyd@email.com',
            password: 'pass',
            passwordConfirmation: 'pass'
          }
        ])
      })
      .then((users) => {
        return Cigar.create([
          {
            name: 'Monte Cristo',
            strength: 'light',
            gauge: 32,
            origin: 'Havana',
            user: users[0],
            //comments: 
          },
          {
            name: 'Romeo Et Julietta',
            strength: 'medium-light',
            gauge: 38,
            origin: 'Havana',
            user: users[1]
          },
          {
            name: 'Partagas',
            strength: 'medium-full',
            gauge: 52,
            origin: 'Havana',
            user: users[2]
          },
          {
            name: 'Cohiba',
            strength: 'medium-full',
            gauge: 36,
            origin: 'Havana',
            user: users[0]
          }
        ])
      })
      .then(cigars => console.log(`${cigars.length} cigars created. `))
      .catch(err => console.log(err))
      .finally(() => mongoose.connection.close())
  } 
)