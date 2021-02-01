import axios from 'axios'
import { useMutation } from 'react-query'

export const useNewWatchlistItem = () => {
  return useMutation((newItem) => axios.post('/api/watchlist/item', newItem))
}
