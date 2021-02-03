import { Box, Image, Text, useDisclosure } from '@chakra-ui/react'

import ShowDetails from './details/ShowDetails'

/**
 * @param viewedEpisodes pass down to ShowDetails component to compare with movie API and find out which episodes the user already saw
 */
const Show: React.FC<{
  id: string
  name: string
  poster: string
  viewedEpisodes: [string]
}> = ({ id, name, poster, viewedEpisodes }) => {
  const { onOpen, onClose, isOpen } = useDisclosure()
  return (
    <>
      <Box onClick={onOpen} border="1px solid black">
        <Image
          w="100%"
          src={`https://image.tmdb.org/t/p/w200${poster}`}
          alt={`${name}-poster`}
        />
        <Text>{name}</Text>
      </Box>
      {isOpen ? (
        <ShowDetails
          showId={id}
          viewedEpisodes={viewedEpisodes}
          onClose={onClose}
          isOpen={isOpen}
        />
      ) : null}
    </>
  )
}

export default Show
