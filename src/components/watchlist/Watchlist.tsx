import { useState } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import { Grid } from '@chakra-ui/react'

import Show from './Show'
import { WatchlistProps } from '../../libs/models/Wacthlist'

/**
 * WIP ==> SHOWS NOT STARTED YET AND LAST SHOW WATCHED
 * FIND A WAY TO NOT BREAK MODAL WHEN ADD A FIRST EPISODE TO A NOT STARTED YET SHOW
 */
const Watchlist: React.FC<{ userId: string }> = ({ userId }) => {
  const [lastWatched, setLastWatched] = useState([])
  const [notStarted, setNotStarted] = useState([])
  const { data, isError, isLoading } = useQuery<WatchlistProps>('watchlist', () =>
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/watchlist/user/${userId}`)
      .then((res) => {
        const r = res.data.data
        setLastWatched(
          r.shows
            .filter((el) => el.lastUpdated !== null)
            .sort((a, b) => a.lastUpdated - b.lastUpdated)
        )
        setNotStarted(r.shows.filter((el) => el.lastUpdated === null))
        return r
      })
  )
  return (
    <div>
      {isLoading ? (
        <span>Loading</span>
      ) : (
        <>
          {isError ? (
            <span>Error</span>
          ) : (
            <>
              {data.shows?.length ? (
                <>
                  <h2>Last watched</h2>
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
                    {lastWatched.map((show) => (
                      <Show
                        key={show.showId}
                        id={show.showId}
                        name={show.name}
                        poster={show.poster}
                        viewedEpisodes={show.watchedEpisodes}
                      />
                    ))}
                  </Grid>

                  <h2>Not started</h2>
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
                    {notStarted.map((show) => (
                      <Show
                        key={show.showId}
                        id={show.showId}
                        name={show.name}
                        poster={show.poster}
                        viewedEpisodes={show.watchedEpisodes}
                      />
                    ))}
                  </Grid>
                </>
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
