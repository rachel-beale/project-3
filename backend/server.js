
const path = require('path')
const dist = path.join(__dirname, 'dist')
const express = require('express')
const expressServer = express()
const { port } = require('./config/environment')
require('dotenv').config()
const bodyParser = require('body-parser')
const Router = require('./router')
const mongoose = require('mongoose')
const { dbURI } = require('./config/environment')

mongoose.connect(

  //! Complete DB location 
  dbURI,

  // This will remove warnings that we don't need. We don't really need
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },

  //  This will be called when you either CONNECT to mongoDB or FAIL to do so
  (err) => {
    if (err) console.log(err)
    else console.log('Mongoose connected successfully!')
  }
)

// For environment variables
console.log(process.env.hello)

// Logging
expressServer.use((req, res, next) => {
  console.log(`Incoming request, ${req.method} to ${req.url}`)
  next()
})

// This is another piece of middleware called body-parser
// That makes data available on my request when im POSTing
// as req.body
expressServer.use(bodyParser.json())

// Adding /api as a common route, so that all requests start with /api
expressServer.use('/api', Router)

// For deployment
expressServer.use('/', express.static(dist))

expressServer.get('*', function (req, res) {
  res.sendFile(path.join(dist, 'index.html'))
})

// We can give it whichever port we like, but it must be unique!
expressServer.listen(port)
