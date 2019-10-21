const Cigar = require('../models/Cigar')

//INDEX
function index(req, res) {
  Cigar
    .find()
    .populate('user')
    .then(cigars => res.status(200).json(cigars))
    .catch(err => res.status(400).json(err))
}

//CREATE
function create(req, res, next) {
  req.body.user = req.currentUser 
  console.log('user creating cigar: ', req.currentUser)
  Cigar
    .create(req.body)
    .then(cigar => res.status(201).json(cigar))
    .catch(next)
}

//SHOW
function show(req, res) {
  Cigar
    .findById(req.params.id)
    .populate('user')
    .populate('comments.user')
    .then(cigar => {
      if (!cigar) return res.status(404).json({ message: 'cigar id not found' })
      res.status(200).json(cigar)
    })
    .catch(err => res.status(400).json(err))
}

//DELETE
function destroy(req, res) {
  console.log('inside destroy')
  Cigar
    .findById(req.params.id)
    .then(cigar => {
      if (!cigar.user.equals(req.currentUser._id)) return res.status(401).json({ message: 'Unauthorized' }) 
      return cigar.remove()
    })
    .then(() => res.sendStatus(204)) 
    .catch(err => res.status(400).json(err)) 
}

function update(req, res, next) {
  console.log('inside update')
  Cigar
    .findById(req.params.id)
    .then(cigar => {
      if (!cigar) return res.status(404).json({ message: 'Not Found' })
      if (!cigar.user.equals(req.currentUser._id)) return res.status(401).json({ message: 'Unauthorized' })
      return cigar.set(req.body)
    })
    .then(cigar => cigar.save())
    .then(cigar => res.status(202).json(cigar))
    .catch(next)
}

//comment create - /cigars/:id/comments
function commentCreate(req, res, next) {
  req.body.user = req.currentUser
  Cigar
    .findById(req.params.id)
    .then(cigar => {
      if (!cigar) return res.status(404).json({ message: 'Not Found' })
      console.log('Body is: ', req.body)
      cigar.comments.push(req.body)
      return cigar.save()
    })
    .then(cigar => res.status(201).json(cigar))
    .catch(next)
}

//comment show - /cigars/:id/comments
function commentShow(req, res) {
  Cigar
    .findById(req.params.id)
    .populate('comments.user')
    .then(cigar => {
      if (!cigar) return res.status(404).json({ message: 'cigar id not found' })
      res.status(200).json(cigar.comments)
    })
    .catch(err => res.status(400).json(err))
}

//comment delete - /cigars/:id/comments/:commentId
function commentDelete(req, res) {
  Cigar
    .findById(req.params.id)
    .then(cigar => {
      if (!cigar) return res.status(404).json({ message: 'Not Found' })
      if (!cigar.user.equals(req.currentUser._id)) return res.status(401).json({ message: 'Unauthorized' })
      const comment = cigar.comments.id(req.params.commentId)
      comment.remove()
      return cigar.save()
    })
    .then(cigar => res.status(202).json(cigar))
    .catch(err => res.json(err))
}

module.exports = {
  index,
  create,
  show,
  destroy,
  update,
  commentCreate,
  commentDelete,
  commentShow
}

/* jacks implementation

const Animal = require('../models/Animal') // we need the Animal models, attached to this are all the mongoose methods to query or create things in our DB. eg Animal.find(), Animal.create()

// index route - /animals
function index(req, res) {
  Animal
    .find() // finds all the animals
    .then(animals => res.status(200).json(animals)) // if found, sends back the animals in an JSON array
    .catch(() => res.status(404).json({ message: 'Not Found' })) // if any error, sends back 404 not found message
}

// create route - /animals
function create(req, res) {
  Animal
    .create(req.body) // creates a new animal based on the JSON object sent as the body of the request
    .then(animal => res.status(201).json(animal)) // if it succesfully creates, sends back that new animal
    .catch(err => res.status(400).json(err)) // otherwise we send the errors
}

// show route - /animals/:id
function show(req, res) {
  Animal
    .findById(req.params.id) // finds one single animal by the id parameter
    .then(animal => {
      if (!animal) return res.status(404).json({ message: 'Not Found ' }) // if for any reason that comes back 'null' we return a response of 404 not found
      res.status(200).json(animal) // otherwise send back the found single animal
    })
    .catch(() => res.status(404).json({ message: 'Not Found ' })) // any error sending a 404 not found message
}

// update route = /animals/id
function update(req, res) {
  Animal
    .findById(req.params.id)
    .then(animal => {
      if (!animal) return res.status(404).json({ message: 'Not Found' })
      return animal.set(req.body)
    })
    .then(animal => animal.save())
    .then(animal => res.status(202).json(animal))
    .catch(err => res.status(422).json(err))
}

function deleteRoute(req, res) {
  Animal
    .findByIdAndRemove(req.params.id)
    .then(() => res.sendStatus(204))
    .catch(err => res.status(400).json(err))
}


// exporting our 'Route Handler' functions to be used buy our Router, found in 'config/router.js'
module.exports = {
  index, // using es6 object shorthand, same as saying index:index
  create,
  show,
  update,
  delete: deleteRoute
} */