import jwt from 'jsonwebtoken'

const { verify } = jwt

const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization')
    if (!token) return res.status(400).json({ error: 'Invalid Authentication' })

    verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) return res.status(400).json({ error: 'Token not valid.' })

      req.user = user
      next()
    })
  } catch (error) {
    return res.status(500).json(error)
  }
}

export default auth
