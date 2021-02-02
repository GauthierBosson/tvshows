import mongoose, { Document, Schema, Types } from 'mongoose'

export interface WatchlistProps extends Document {
  userId: Types._ObjectId
  name: string
  poster: string
  shows: [
    {
      showId: string
      watchedSeasons: [number]
    }
  ]
}

delete mongoose.connection.models['Watchlist']

const WatchlistSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  shows: [
    {
      showId: String,
      name: String,
      poster: String,
      watchedSeasons: [
        {
          number: Number,
          WatchedEpisodes: [Number],
        },
      ],
    },
  ],
})

// export default mongoose.models.Watchlist ||
//   mongoose.model<WatchlistProps>('Watchlist', WatchlistSchema)

export default mongoose.model<WatchlistProps>('Watchlist', WatchlistSchema)
