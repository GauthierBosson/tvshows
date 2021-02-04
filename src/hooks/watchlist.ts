import axios, { AxiosError, AxiosResponse } from 'axios'
import { useMutation, UseMutationResult, useQueryClient } from 'react-query'

export const useNewWatchlistItem = (): UseMutationResult<
  AxiosResponse,
  AxiosError
> => {
  const queryClient = useQueryClient()
  return useMutation(
    (newItem: { id: string; name: string; poster: string }) =>
      axios.post('/api/watchlist/show', newItem),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('watchlist')
      },
    }
  )
}

export const useAddEpisode = (): UseMutationResult<
  AxiosResponse,
  AxiosError,
  { showId: string; episode: number; seasonNumber: string }
> => {
  const queryClient = useQueryClient()
  return useMutation((newItem) => axios.post('/api/watchlist/episode', newItem), {
    onSuccess: () => {
      queryClient.invalidateQueries('watchlist')
      queryClient.invalidateQueries('getShowLength')
    },
  })
}

export const useDeleteEpisode = (): UseMutationResult<
  AxiosResponse,
  AxiosError,
  { showId: string; episode: number; seasonNumber: string }
> => {
  const queryClient = useQueryClient()
  return useMutation((newItem) => axios.put('/api/watchlist/episode', newItem), {
    onSuccess: () => {
      queryClient.invalidateQueries('watchlist')
      queryClient.invalidateQueries('getShowLength')
    },
  })
}

// export const useGetUserWatchlist = (user) => {
//   return useQuery('watchlist', () => axios.get(`${process.env.BASE_URL}/api/watchlist/user/${user.id}`))
// }
