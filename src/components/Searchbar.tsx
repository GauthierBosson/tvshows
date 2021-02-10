import { useState, useEffect } from 'react'
import { useFindShows } from '../hooks/shows'
import { useNewWatchlistItem } from '../hooks/watchlist'
import { Input, VStack, StackDivider, Box } from '@chakra-ui/react'

const Searchbar = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [expanded, setExpanded] = useState<boolean>(false)
  const { data, isLoading, isError, refetch } = useFindShows(
    searchQuery,
    searchQuery.length
  )
  const mutation = useNewWatchlistItem()

  useEffect(() => {
    if (searchQuery.length >= 5) {
      refetch()
    }
  }, [searchQuery])

  return (
    <VStack
      position="relative"
      w={['100%', '100%', '70%', '70%', '50%']}
      spacing={4}
      my={16}
      mx="auto"
    >
      <Input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        size="lg"
        rounded="full"
        placeholder="Search for your next show"
        aria-expanded={expanded}
        onFocus={() => setExpanded(true)}
        onBlur={() => {
          setTimeout(() => setExpanded(false), 100)
        }}
      />
      {searchQuery.length >= 5 && expanded ? (
        <>
          {isLoading ? (
            <span>Loading...</span>
          ) : (
            <Box
              h="300px"
              py={3}
              overflowY="scroll"
              w="100%"
              borderWidth="1px"
              borderRadius="3xl"
              bgColor="white"
              pos="absolute"
              zIndex="1"
              top="50px"
            >
              {isError ? (
                <span>error</span>
              ) : (
                <VStack w="100%" divider={<StackDivider borderColor="gray.200" />}>
                  {data.map((d) => (
                    <Box
                      key={d.id}
                      d="flex"
                      justifyContent="space-between"
                      py={3}
                      px={4}
                      w="100%"
                    >
                      <span>{d.name}</span>
                      <button
                        onClick={() =>
                          mutation.mutate({
                            id: d.id,
                            name: d.name,
                            poster: d.poster_path,
                          })
                        }
                      >
                        Add to watchlist
                      </button>
                    </Box>
                  ))}
                </VStack>
              )}
            </Box>
          )}
        </>
      ) : null}
    </VStack>
  )
}

export default Searchbar
