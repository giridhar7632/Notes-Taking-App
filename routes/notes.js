import express from 'express'

import { getNotes, createNotes } from '../controllers/notes.js'

const router = express.Router()

router.get('/', getNotes)
router.post('/', createNotes)

export default router
