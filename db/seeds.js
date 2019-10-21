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
            image: 'https://images.unsplash.com/photo-1514514589924-94eda1732498?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
            comments: [
              {
                text: 'Test comment...',
                user: users[0]
              }
            ]
          },
          {
            name: 'Romeo Et Julietta',
            strength: 'medium-light',
            gauge: 38,
            origin: 'Havana',
            user: users[1],
            image: 'https://cigarsindia.in/image/cache/data/Romeo2/Romeo%20Y%20Julieta%20-%20Wide%20Churchills,%20cigars%20india-500x500.jpg'
          },
          {
            name: 'Partagas',
            strength: 'medium-full',
            gauge: 52,
            origin: 'Havana',
            user: users[2],
            image: 'https://www.cubancigar-shop.com/media/filter/medium/img/maxresdefault_1_lusitanias_2.jpg'
          },
          {
            name: 'Cohiba',
            strength: 'medium-full',
            gauge: 36,
            origin: 'Havana',
            user: users[0],
            image: 'https://cigarsindia.in/image/cache/data/Amati/Cohiba%20Piramides,%20cigars%20india-500x500.jpg'
          }
        ])
      })
      .then(cigars => console.log(`${cigars.length} cigars created. `))
      .catch(err => console.log(err))
      .finally(() => mongoose.connection.close())
  } 
)