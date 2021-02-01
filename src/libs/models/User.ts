import mongoose, { Document, Schema } from 'mongoose'

export interface UserProps extends Document {
  email: string
  password: string
}

delete mongoose.connection.models['User']

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

// export default mongoose.models.User || mongoose.model('User', UserSchema)

export default mongoose.model<UserProps>('User', UserSchema)
