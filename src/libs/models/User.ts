import mongoose, { Document, Schema } from 'mongoose'

export interface UserProps extends Document {
  email: string
  password: string
}

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: [true, 'A email address is required'],
  },
  password: {
    type: String,
    required: [true, 'A password is required'],
  },
})

export default mongoose.models.User || mongoose.model('User', UserSchema)
