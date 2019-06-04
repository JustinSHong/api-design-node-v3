import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema.Types

// schema options
const options = {
  timestamps: true
}

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50
    },
    status: {
      type: String,
      required: true,
      default: 'active',
      enum: ['active', 'complete', 'pastdue']
    },
    notes: String,
    due: Date,
    createdBy: {
      type: ObjectId,
      required: true,
      ref: 'user' // refer to the user model
    },
    list: {
      type: ObjectId,
      required: true,
      ref: 'list' // refer to the list model
    }
  },
  options
)

// for a list, make sure the name of the task is unique
// order of the fields matters since it dictates traversal
itemSchema.index({ list: 1, name: 1 }, { unique: true })

export const Item = mongoose.model('item', itemSchema)
