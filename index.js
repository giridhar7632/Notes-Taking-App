import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import notesRoute from './routes/notes.js'

dotenv.config()
const app = express()
const port = process.env.PORT || 5000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

const uri = process.env.MONGO_URI
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB connection is established successfully 🚀'))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.json({ init: 'hello world 👋' })
})

app.use('/notes', notesRoute)

app.listen(port, () => console.log('Server running on port ' + port))
