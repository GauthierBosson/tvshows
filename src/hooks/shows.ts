import { useQuery, useQueries, UseQueryResult } from 'react-query'
import axios, { AxiosError } from 'axios'

export interface ShowProps {
  id: number
  overview: string
  name: string
  poster_path: string
  number_of_episodes: number
  number_of_seasons: number
  seasons: [
    {
      episode_count: number
      id: number
      name: string
      season_number: number
    }
  ]
}

export interface SeasonProps {
  episodes: [
    {
      id: number
      name: string
      season_number: number
      episode_number: number
    }
  ]
}

export const useFindShows = (
  queryParam: string,
  queryLength: number
): UseQueryResult<ShowProps[], AxiosError> => {
  return useQuery(
    'getShows',
    () =>
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/search/tv?query=${queryParam}&api_key=${process.env.NEXT_PUBLIC_API_KEY}`
        )
        .then((res) => res.data.results),
    { enabled: queryLength >= 5 ? true : false }
  )
}

export const useGetOneShow = (
  id: number | string
): UseQueryResult<ShowProps, AxiosError> => {
  return useQuery('getOneShow', () =>
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/tv/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      )
      .then((res) => res.data)
  )
}

export const useGetShowDetails = (
  id: number | string,
  isOpen: boolean
): UseQueryResult<ShowProps, AxiosError> => {
  return useQuery(
    ['getShowDetails', id],
    () =>
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/tv/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
        )
        .then((res) => res.data),
    { enabled: isOpen }
  )
}

export const useGetShowSeason = (
  showId: number | string,
  seasonNum: string
): UseQueryResult<SeasonProps, AxiosError> => {
  return useQuery(
    ['getShowSeason', `${showId}-${seasonNum}`],
    () =>
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/tv/${showId}/season/${seasonNum}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
        )
        .then((res) => res.data),
    { enabled: seasonNum.length > 0 }
  )
}

// MAYBE USE LATER
export const useWatchlistItems = (
  watchlist: [{ id: string }]
): UseQueryResult<any, any>[] => {
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
