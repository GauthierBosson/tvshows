import { useQuery, useQueries, UseQueryResult } from 'react-query'
import axios, { AxiosError } from 'axios'

export interface ShowProps {
  id: number
  overview: string
  name: string
  poster_path: string
  number_of_episodes: number
  number_of_seasons: number
}

export const useFindSeries = (
  queryParam: string,
  isEnabled: boolean
): UseQueryResult<ShowProps[], AxiosError> => {
  return useQuery(
    'getMovies',
    () =>
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/search/tv?query=${queryParam}&api_key=${process.env.NEXT_PUBLIC_API_KEY}`
        )
        .then((res) => res.data.results),
    { enabled: isEnabled }
  )
}

export const useGetOneShow = (id: number): UseQueryResult<ShowProps, AxiosError> => {
  return useQuery('getOneMovie', () =>
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/tv/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      )
      .then((res) => res.data)
  )
}

export const useWatchlistItems = (watchlist: []): UseQueryResult<any, any>[] => {
  return useQueries(
    watchlist.map((w) => ({
      queryKey: ['watchlistItem', w.id],
      queryFn: () =>
        axios
          .get(
            `${process.env.NEXT_PUBLIC_API_URL}/tv/${w.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
          )
          .then((res) => res.data),
    }))
  )
}
