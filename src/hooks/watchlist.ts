import axios, { AxiosError, AxiosResponse } from 'axios'
import { useMutation, UseMutationResult, useQueryClient } from 'react-query'

export const useNewWatchlistItem = (): UseMutationResult<
  AxiosResponse,
  AxiosError
> => {
  const queryClient = useQueryClient()
  return useMutation(
    (newItem: { id: string | number }) => axios.post('/api/watchlist/item', newItem),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('watchlist')
      },
    }
  )
}

// export const useGetUserWatchlist = (user) => {
//   return useQuery('watchlist', () => axios.get(`${process.env.BASE_URL}/api/watchlist/user/${user.id}`))
// }
