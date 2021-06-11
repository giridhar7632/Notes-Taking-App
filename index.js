import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import path from 'path'

import notesRoute from './routes/notes.js'
import usersRoute from './routes/users.js'

// basic configuration
dotenv.config()
const app = express()
const port = process.env.PORT || 5000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

// connecting to mongodb atlas
const uri = process.env.MONGO_URI
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB connection is established successfully 🎉'))
  .catch(err => console.log(err))

// routes
app.use('/api/notes', notesRoute)
app.use('/users', usersRoute)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  })
}

// listening the server
app.listen(port, () => console.log(`Server listening on port ${port} 🚀`))
