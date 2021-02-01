import { useState, useEffect } from 'react'
import { useFindShows } from '../hooks/shows'
import { Input, VStack, StackDivider, Box } from '@chakra-ui/react'

const Searchbar = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState<string>('')

  const { data, isLoading, isError, refetch } = useFindShows(
    searchQuery,
    searchQuery.length
  )

  useEffect(() => {
    if (searchQuery.length >= 5) {
      refetch()
    }
  }, [searchQuery])

  return (
    <VStack w="40%" spacing={4}>
      <Input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        size="lg"
        rounded="full"
        placeholder="Search for your next show"
      />
      {searchQuery.length >= 5 ? (
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
            >
              {isError ? (
                <span>error</span>
              ) : (
                <VStack w="100%" divider={<StackDivider borderColor="gray.200" />}>
                  {data.map((d) => (
                    <Box key={d.id} py={3} px={4} w="100%">
                      <span>{d.name}</span>
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
