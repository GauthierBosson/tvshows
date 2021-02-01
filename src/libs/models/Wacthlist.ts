import mongoose, { Document, Schema } from 'mongoose'

export interface WatchlistProps extends Document {
  userId: Schema.Types.ObjectId
  shows: [
    {
      id: string
      watchedSeasons: [number]
    }
  ]
}

const WatchlistSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  shows: [
    {
      id: String,
      watchedSeasons: [
        {
          number: Number,
          WatchedEpisodes: [Number],
        },
      ],
    },
  ],
})

export default mongoose.models.Watchlist ||
  mongoose.model('Watchlist', WatchlistSchema)
