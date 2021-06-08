import express from 'express'

import { getNotes, createNotes } from '../controllers/notes.js'

const router = express.Router()

router.route('/').get().post

router.route('/:id').get().put().delete()

export default router
