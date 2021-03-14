const axios = require('axios')
const Data = require('../models/data')
require('dotenv').config()

// ? GET PLANT FROM EXTERNAL API
function getExternalData(req, res) {
  const query = req.params.query
  const token = process.env.trefleToken

  axios.get(`https://trefle.io/api/v1/species/search?token=${token}&q=${query}`)

    .then(resp => res.send(resp.data))
    .catch(err => res.send(err))
}

// ? ADD PLANT TO OUR API
function addPlants(req, res) {
  req.body.user = req.currentUser

  Data
    .create(req.body)
    .then(plant => res.send(plant))
    .catch(error => res.send(error))
}

function getPlants(req, res) {
  Data
    .find()
    .populate('user')
    .then(resp => res.send(resp))
}

function getPlantsByUser(req, res) {
  const userId = req.params.userid
  Data
    .find({ user: userId })
    .then(resp => res.send(resp))
}

// ? EDIT OUR PLANT
function editPlants(req, res) {
  const name = req.params.id
  const currentUser = req.currentUser
  const body = req.body
  Data
    .findById(name)
    .then(plant => {
      if (!plant) return res.send({ message: 'No Plant Found' })
      if (!req.currentUser.isAdmin && !plant.user.equals(currentUser._id)) return res.status(401).send({ status: 'Unauthorized' })

      plant.set(body)
      plant.save()
      res.send(plant)
    })
    .catch(err => res.send(err))
}

// ? DELETE OUR PLANT 
function deletePlants(req, res) {
  const name = req.params.id
  const currentUser = req.currentUser

  Data
    .findById(name)
    .then(plant => {
      if (!plant) return res.send({ message: 'No Plant Found' })
      if (!req.currentUser.isAdmin && !plant.user.equals(currentUser._id)) return res.status(401).send({ status: 'Unauthorized' })
      plant.deleteOne()
      res.send(plant)
    })
    .catch(err => res.send(err))
}

// ? GET SINGLE PLANT
function singlePlant(req, res) {
  const id = req.params.id
  Data
    .findById(id)
    .then(plant => {
      res.send(plant)
    })
    .catch(err => res.send(err))
}


module.exports = {
  getExternalData,
  addPlants,
  editPlants,
  deletePlants,
  getPlants,
  getPlantsByUser,
  singlePlant
}