const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')
const axios = require('axios')
const { Error } = require('mongoose')

// ? REGISTER
function registerUser(req, res) {
  const body = req.body
  User
    .create(body)
    .then(user => {
      res.send(user)
    })
    .catch(err => res.send(err))
}


// ? LOGIN
function loginUser(req, res) {
  User
    .findOne({ userName: req.body.userName })
    .then(user => {
      if (!user) {
        return res.status(401).send({ message: 'Invalid User' })
      }
      if (!user.validatePassword(req.body.password)) {
        return res.status(401).send({ message: 'Invalid Password' })
      }
      const token = jwt.sign(
        { sub: user._id },
        secret,
        { expiresIn: '50hr' }
      )
      res.status(202).send({ token, message: 'Login was successful' })
    })
    .catch(err => res.send(err))
}


// ? EDIT USER
function editUser(req, res) {
  // userid is whats in our route
  const userId = req.params.userid
  const body = req.body
  // _id is the mongoose user object key 
  const currentUserId = req.currentUser._id

  User
    .findById(userId)
    .then(user => {
      if (!user) return res.send({ message: 'No User Found' })
      if (!user.equals(currentUserId)) return res.send({ message: 'Unauthorized User' })

      user.set(body)
      user.save()
      res.send(user)
    })
    .catch(err => res.send(err))
}


// ? DELETE USER
function deleteUser(req, res) {
  const userId = req.params.userid
  const currentUserId = req.currentUser._id

  User
    .findById(userId)
    .then(user => {
      if (!user) return res.send({ message: 'No User Found' })
      if (!user.equals(currentUserId)) return res.send({ message: 'Unauthorized User' })

      user.deleteOne()
      res.send({ message: 'User Deleted' })
    })
    .catch(err => res.send(err))
}

// ? GET USER
function getUser(req, res) {
  const userId = req.params.userid
  User
    .findById(userId)
    .populate('plants')
    .then(user => {
      if (!user) return res.send({ message: 'No User Found' })
      res.send(user)
    })
    .catch(err => res.send(err))
}

// ? LIST USERS 
function listUsers(req, res) {
  User
    .find()
    .populate('plants')
    .then(resp => res.send(resp))
}

// ? PROXY POSTCODE INFORMATION
function postcodeGet(req, res) {
  const postcode = req.params.postcode
  axios.get(`https://api.postcodes.io/postcodes/${postcode}`)
    .then(resp => res.send(resp.data))
    .catch(err => res.send(err))
}

module.exports = {
  registerUser,
  loginUser,
  editUser,
  deleteUser,
  getUser,
  listUsers,
  postcodeGet
}