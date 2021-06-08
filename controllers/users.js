import { compare, hash } from 'bcrypt'
import jwt from 'jsonwebtoken'
import Users from '../models/users.model.js'

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body
    const user = await Users.findOne({ email: email })

    // 1. Check if user already exists
    if (user)
      return res
        .status(400)
        .json({ error: 'User already exists with the email.' })

    // 2. Encrypt password
    const passwordHash = await hash(password, 10)

    // 3. Create a user in database
    const newUser = new Users({
      username: username,
      email: email,
      password: passwordHash,
    })
    await newUser.save()
    res.send('Registered Successfully 🥳')
  } catch (error) {
    return res.status(400).json(error)
  }
}

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    // 1. check if user exists
    const user = await Users.findOne({ email: email })

    // 2. If user dosen't exists
    if (!user) return res.status(400).json({ error: 'User does not exist. 😕' })

    // 3. Check for password match
    const isMatch = await compare(password, user.password)
    if (!isMatch)
      return res.status(400).json({ error: 'Incorrect password. ⚠' })

    // 4. if login success, create a token
    const payload = { id: user._id, name: user.username }
    const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
      expiresIn: '7d',
    })

    res.json(token)
    //res.send('Sign in Successful ✌')
  } catch (error) {
    return res.status(400).json(error)
  }
}
