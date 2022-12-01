import { Box, Center, Flex, Heading, Table, TableContainer, Tbody, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react"
import axios from "axios"
import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import ButtonPagination from "../components/ButtonPagination"
import Identity from "../components/Identity"
import SongRow from "../components/rows/SongRow"
import UploadModal from "../components/modals/UploadModal"
import { Song } from "../interface/Song"

const SongPage = () => {
  const url = 'http://localhost:3000'
  const limit = 5
  const [songs, setSongs] = useState<Song[]>([])
  const [page, setPage] = useState<number>(1)
  const breakpointSize = useBreakpointValue(['md', 'lg', 'xl'])
  
  const setPages = (page: number) => {
    axios.get(`${url}/song?limit=${limit}&page=${page}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${sessionStorage.getItem("auth_token")}`
      }
    }).then((response) => {
      var songList: Song[] = []

      if (response.data.data.length > 1){
        response.data.data.forEach((item: Song) => {
          songList.push({
            _id: item._id,
            judul: item.judul,
            audio_path: item.audio_path
          })
        })
      } else {
        songList.push({
          _id: response.data.data._id,
          judul: response.data.data.judul,
          audio_path: response.data.data.audio_path
        })
      }

      setSongs(songList);
      setPage(page);
  })
  }

  useEffect(() => {
    setPages(1)
  }, [])

  const is_admin = sessionStorage.getItem("is_admin") === "true"

  if (is_admin){
    return <Navigate to = "/subscription" replace />
  }

  return (
    <Box minHeight="100vh" pb={10}>
    <Identity/>
    <Center w = "100vw">
      <Flex mt={{base: '5', md: '10'}} direction="column" justifyContent="flex-start" alignItems="center" width="100%" height="100%">
        <Heading color="green.700" size={breakpointSize} mb={5}>Your Premium Songs</Heading>
        <UploadModal for = "upload"/>
        {songs.length !== 0 ?
        <Flex width={{base: '100%', md: '80%'}} mt={{base: '5', md: '10'}} direction="column" alignItems="center">
          <TableContainer width="100%" borderRadius="md">
            <Table variant="unstyled">
              <Thead borderBottom="1px" color="green.900" bg="green.200">    
                <Tr borderTopRadius="10px">
                  <Th width="1%" fontSize={{base: 'sm', md: 'md'}} textAlign="center">#</Th>
                  <Th width="44%" fontSize={{base: 'sm', md: 'md'}}>Judul</Th>
                  <Th width="10%" fontSize={{base: 'sm', md: 'md'}}></Th>
                </Tr>
              </Thead>
              <Tbody>
                {songs.map((song, i) => (
                  (i < limit) &&
                  <SongRow key={i} song={song} index={(page-1)*limit+i}/>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <ButtonPagination page={page} setPage={setPages} isEnd={songs.length <= limit}/>
        </Flex>
        : <Heading fontSize={{ base: '20px', md: '28px', lg: '32px' }} mt = {5}>You don't have any songs yet!</Heading>}
      </Flex>
    </Center>
    </Box>
  )
}

export default SongPage;