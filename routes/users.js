import express from 'express'
import { registerUser, loginUser, verifyUser } from '../controllers/users.js'
import auth from '../middleware/auth.js'

const router = express.Router()

// 1. Register a user
router.post('/register', registerUser)

// 2. Login a user
router.post('/login', loginUser)

// 3. Verify token
router.get('/verify', verifyUser)

export default router
