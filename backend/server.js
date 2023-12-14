require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')
const recordRoutes = require('./routes/record')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

// connect to db
//mongoose.connect("mongodb+srv://anwitd11damale:dxMp83HP1Q422O2Q@cluster0.de2b5ep.mongodb.net/?retryWrites=true&w=majority")
mongoose.connect("mongodb://mydatabase:27017")  
.then(() => {
    // listen for requests
    app.listen(4000, () => {
      console.log('connected to db & listening on port!!')
    })
  })
  .catch((error) => {
    console.log(error)
  })