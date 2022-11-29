import { Flex, Heading, IconButton, Table, TableContainer, Tbody, Th, Thead, Tr, Center, Text } from "@chakra-ui/react"
import { MdEdit } from "react-icons/md"
import { Song } from "../interface/Song"
import UploadModal from "../components/UploadModal"
import { useEffect, useState } from "react"
import axios from "axios"
import DeleteModal from "../components/DeleteModal"

const SongPage = () => {

  const [songs, setSongs] = useState<Song[]>([])

  const handleClick = (song_id: String | null) => {
    console.log("click", song_id)
  }

  const handleDelete = (song_id: String | null) => {
    console.log("delete", song_id)
  }

  const handleEdit = (song_id: String | null) => {
    console.log("edit", song_id)
  }

  useEffect(() => {
    axios.get(`http://localhost:3000/song`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${sessionStorage.getItem("auth_token")}`
      }
    }).then((response) => {
      console.log(response)

      var songList: Song[] = []
      response.data.data.forEach((item: Song) => {
        songList.push({
          _id: item._id,
          judul: item.judul,
          audio_path: item.audio_path
        })
        // console.log(songs)
      })

      setSongs(songList);
      console.log(songs)
    })
  }, [])

  return (
    <Center w = "100vw">
      <Flex mt={20} direction="column" justifyContent="flex-start" alignItems="center" width="100%" height="100vh" pt={5}>
        <Heading color="green.700">Your Premium Songs</Heading>
        <UploadModal for = "upload"/>
        {songs.length > 0 ?
        <TableContainer width="80%" mt={10}>
          <Table variant="unstyled">
            <Thead borderBottom="1px" >    
              <Tr>
                <Th width="1%" fontSize="md">#</Th>
                <Th width="44%" fontSize="md">Judul</Th>
                <Th width="10%" fontSize="md"></Th>
              </Tr>:
            </Thead>
            <Tbody>
              {songs.map((song, i) => (
                <Tr 
                  key={song._id}
                  _hover={{
                    background: "teal.100"
                  }}
                  onClick={() => handleClick(song._id)}
                >
                  <Th>{i+1}</Th>
                  <Th>{song.judul}</Th>
                  <Th display="flex" justifyContent="space-between">
                    <UploadModal for = "edit" song_id = {song._id}/>
                    <DeleteModal song_id = {song._id} title = {song.judul} />
                  </Th>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        : <Heading size = 'md' mt = {10}>You don't have any songs yet!</Heading>}
      </Flex>
    </Center>
  )
}

export default SongPage