import { useState, useRef, useEffect } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import { Grid, Select } from '@chakra-ui/react'

import Show from './Show'
import { WatchlistProps, ShowProps } from '../../libs/models/Wacthlist'

const Watchlist: React.FC<{ userId: string }> = ({ userId }) => {
  const [dataShows, setDataShows] = useState<ShowProps[]>([])
  const showSelectRef = useRef<HTMLSelectElement>(null)
  const { data, isError, isLoading } = useQuery<WatchlistProps>('watchlist', () =>
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/watchlist/user/${userId}`)
      .then((res) => {
        const r = res.data.data
        setDataShows(r.shows)
        return r
      })
  )

  useEffect(() => {
    handleShowStateChange(showSelectRef.current.value)
  }, [showSelectRef.current, data])

  const handleShowStateChange = (value: string) => {
    if (value === 'ALL') {
      setDataShows(data.shows)
    } else if (value === 'LAST_WATCHED') {
      setDataShows(
        data.shows
          .filter((el) => el.lastUpdated !== null)
          .sort(
            (a, b) =>
              new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
          )
      )
    } else if (value === 'NOT_STARTED') {
      setDataShows(data.shows.filter((el) => el.lastUpdated === null))
    }
  }

  return (
    <div>
      <Select
        ref={showSelectRef}
        onChange={(e) => handleShowStateChange(e.target.value)}
        w="300px"
      >
        <option value="ALL">Show all</option>
        <option value="LAST_WATCHED">Show last watched</option>
        <option value="NOT_STARTED">Show not begin</option>
      </Select>
      {isLoading ? (
        <span>Loading</span>
      ) : (
        <>
          {isError ? (
            <span>Error</span>
          ) : (
            <>
              {dataShows.length ? (
                <Grid
                  gridTemplateColumns={[
                    'repeat(2, 1fr)',
                    'repeat(3, 1fr)',
                    'repeat(4, 1fr)',
                    'repeat(5, 1fr)',
                    'repeat(auto-fill, minmax(150px, 1fr))',
                  ]}
                  justifyContent={['center', 'normal']}
                  gap={[6, 6, 6, 12, 12]}
                >
                  {dataShows.map((show) => (
                    <Show
                      key={show.showId}
                      id={show.showId}
                      name={show.name}
                      poster={show.poster}
                      viewedEpisodes={show.watchedEpisodes}
                    />
                  ))}
                </Grid>
              ) : (
                <p>Nothing on your watchlist yet</p>
              )}
            </>
          )}
        </>
      )}
    </div>
  )
}

export default Watchlist
