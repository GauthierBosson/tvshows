import { useQuery } from 'react-query'
import axios from 'axios'
import { Grid } from '@chakra-ui/react'

import Show from './Show'

const Watchlist: React.FC<{ userId: string }> = ({ userId }) => {
  const { data, isError, isLoading } = useQuery('watchlist', () =>
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
                  gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))"
                  gap={6}
                >
                  {data.shows.map((show) => (
                    <Show
                      key={show._id}
                      id={show.showId}
                      name={show.name}
                      poster={show.poster}
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
