import { useState, useEffect } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  Select,
  Box,
  Flex,
  VStack,
  Text,
  StackDivider,
  Button,
} from '@chakra-ui/react'

import { useGetShowDetails, useGetShowSeason } from '../../../hooks/shows'
import { useAddEpisode, useDeleteEpisode } from '../../../hooks/watchlist'

const ShowDetails: React.FC<{
  showId: string
  viewedEpisodes: [string]
  onClose: () => void
  isOpen: boolean
}> = ({ showId, viewedEpisodes, onClose, isOpen }) => {
  const [season, setSeason] = useState<string>('')
  const [seasonViewedEpisodes, setSeasonViewedEpisodes] = useState<string[]>([])
  const { data, isError, isLoading } = useGetShowDetails(showId, isOpen)
  const seasonDetails = useGetShowSeason(showId, season)
  const addEpisode = useAddEpisode()
  const deleteEpisode = useDeleteEpisode()

  useEffect(() => {
    if (season !== '') {
      setSeasonViewedEpisodes(
        viewedEpisodes
          .filter((el) => el.startsWith(season))
          .map((el) => el.substr(2))
      )
    }
  }, [season, viewedEpisodes])

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="2xl">
      <ModalOverlay>
        <ModalContent>
          <ModalHeader>Test header</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isLoading ? (
              <span>Loading</span>
            ) : (
              <>
                {isError ? (
                  <span>Error</span>
                ) : (
                  <>
                    <Select
                      onChange={(e) => setSeason(e.currentTarget.value)}
                      value={season}
                      w="200px"
                    >
                      <option value="">Choose season</option>
                      {data.seasons.map((season) => (
                        <option
                          key={season.id}
                          value={season.season_number.toString()}
                        >
                          Saison {season.season_number}
                        </option>
                      ))}
                    </Select>
                    <Box h="500px" overflowY="scroll">
                      {season.length > 0 ? (
                        <>
                          {seasonDetails.isLoading ? (
                            <span>Loading</span>
                          ) : (
                            <>
                              {seasonDetails.isError ? (
                                <span>error</span>
                              ) : (
                                <VStack
                                  divider={<StackDivider borderColor="gray.200" />}
                                >
                                  {seasonDetails.data.episodes.map((episode) => (
                                    <Flex
                                      key={episode.id}
                                      w="100%"
                                      justify="space-between"
                                      align="center"
                                      py={3}
                                    >
                                      <Text>
                                        {episode.episode_number} - {episode.name}
                                      </Text>
                                      <Box>
                                        {seasonViewedEpisodes.find(
                                          (el) =>
                                            el === episode.episode_number.toString()
                                        ) ? (
                                          <Button
                                            onClick={() =>
                                              deleteEpisode.mutate({
                                                showId: showId,
                                                episode: episode.episode_number,
                                                seasonNumber: season,
                                              })
                                            }
                                            variant="ghost"
                                          >
                                            Del
                                          </Button>
                                        ) : (
                                          <Button
                                            onClick={() =>
                                              addEpisode.mutate({
                                                showId: showId,
                                                episode: episode.episode_number,
                                                seasonNumber: season,
                                              })
                                            }
                                            variant="ghost"
                                          >
                                            Add
                                          </Button>
                                        )}
                                      </Box>
                                    </Flex>
                                  ))}
                                </VStack>
                              )}
                            </>
                          )}
                        </>
                      ) : (
                        <span>Select a season</span>
                      )}
                    </Box>
                  </>
                )}
              </>
            )}
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  )
}

export default ShowDetails
