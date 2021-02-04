import { Box, Image, Text, useDisclosure, Progress } from '@chakra-ui/react'

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
      <Box position="relative" cursor="pointer" onClick={onOpen}>
        <Image
          rounded="xl"
          shadow="2xl"
          transition="0.3s all"
          _hover={{ shadow: 'dark-lg' }}
          w="100%"
          src={`https://image.tmdb.org/t/p/w200${poster}`}
          alt={`${name}-poster`}
        />
        <Progress
          position="absolute"
          size="sm"
          w="100%"
          value={80}
          roundedBottom="xl"
          bottom="24px"
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
