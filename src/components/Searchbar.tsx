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
    <VStack spacing={4}>
      <Input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        w="40%"
        size="lg"
        rounded="full"
        placeholder="Search for your next show"
      />
      {searchQuery.length >= 5 ? (
        <VStack divider={<StackDivider borderColor="gray.200" />}>
          {isLoading ? (
            <span>Loading...</span>
          ) : (
            <>
              {isError ? (
                <span>error</span>
              ) : (
                <>
                  {data.map((d) => (
                    <Box key={d.id}>
                      <span>{d.name}</span>
                    </Box>
                  ))}
                </>
              )}
            </>
          )}
        </VStack>
      ) : null}
    </VStack>
  )
}

export default Searchbar
