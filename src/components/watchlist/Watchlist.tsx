import { useQuery } from 'react-query'
import axios from 'axios'
import { Grid } from '@chakra-ui/react'

import Show from './Show'
import { WatchlistProps } from '../../libs/models/Wacthlist'

const Watchlist: React.FC<{ userId: string }> = ({ userId }) => {
  const { data, isError, isLoading } = useQuery<WatchlistProps>('watchlist', () =>
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/watchlist/user/${userId}`)
      .then((res) => res.data.data)
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
                  {data.shows.map((show) => (
                    <Show
                      key={show._id}
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
