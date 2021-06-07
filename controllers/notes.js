import Notes from '../models/notes.model.js'

export const getNotes = async (req, res) => {
  try {
    const notesModel = await Notes.find()
    res.status(200).json(notesModel)
  } catch (error) {
    res.status(404).json(error)
  }
}

export const createNotes = async (req, res) => {
  const notes = req.body
  const newNote = new Notes(notes)
  try {
    await newNote.save()
    res.status(200).json(newNote)
  } catch (error) {
    res.status(404).json(error)
  }
}
