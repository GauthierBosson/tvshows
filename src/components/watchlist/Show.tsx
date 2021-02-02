import { Box, Image, Text, useDisclosure } from '@chakra-ui/react'

import ShowDetails from './ShowDetails'

const Show: React.FC<{ id: string; name: string; poster: string }> = ({
  id,
  name,
  poster,
}) => {
  const { onOpen, onClose, isOpen } = useDisclosure()
  return (
    <>
      <Box onClick={onOpen} border="1px solid black">
        <Image src={`https://image.tmdb.org/t/p/w200${poster}`} />
        <Text>{name}</Text>
      </Box>
      {isOpen ? <ShowDetails showId={id} onClose={onClose} isOpen={isOpen} /> : null}
    </>
  )
}

export default Show
