import mongoose, { Document, Schema, Types } from 'mongoose'

export interface WatchlistProps extends Document {
  userId: Types._ObjectId
  shows: [ShowProps]
}

export interface ShowProps extends Document {
  showId: string
  name: string
  poster: string
  lastUpdated: Date | null
  watchedEpisodes: [string]
}

/**
 * https://github.com/dherault/serverless-offline/issues/258#issuecomment-709460076
 * Thanks to this Next has no more issues with rebuilding models and TS doesn't panic anymore on mongoose fn call (like create)
 */
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
      lastUpdated: {
        type: Date || null,
        default: null,
      },
      watchedEpisodes: [String],
    },
  ],
})

// export default mongoose.models.Watchlist ||
//   mongoose.model<WatchlistProps>('Watchlist', WatchlistSchema)

export default mongoose.model<WatchlistProps>('Watchlist', WatchlistSchema)
