import mongoose from 'mongoose'

const { Schema } = mongoose

const notesSchema = new Schema(
  {
    title: String,
    description: { type: String, required: true },
    author: { type: String, required: true },
    createAt: {
      type: Date,
      default: new Date(),
    },
  },
  {
    timestamps: true,
  }
)

const Notes = mongoose.model('Notes', notesSchema)

export default Notes
