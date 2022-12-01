import { HStack, Td, Tr } from '@chakra-ui/react'
import DeleteModal from '../modals/DeleteModal'
import UploadModal from '../modals/UploadModal'
import { Song } from "../../interface/Song"

interface SongProps {
  song: Song,
  index: number,
}

const SongRow = (props: SongProps) => {
  const {song, index} = props
  return (
    <Tr
      key={song._id}
      borderRadius="md"
      color="black"
      fontWeight="semibold"
      borderBottom="1px solid #e2e8f0"
      _hover={{
        background: "green.100"
      }}
    >
    <Td
      textAlign="center"
      px={{ base: '4px', sm:'8px', md: '12px'}}
      fontSize={{base: 'sm', md: 'md'}}
    >
        {index + 1}
    </Td>
    <Td
      px={{ base: '4px', sm:'8px', md: '12px'}}
      fontSize={{base: 'sm', md: 'md'}}
    >
        {song.judul}
    </Td>
    <Td
      textAlign="center"
      px={{ base: '4px', sm:'8px', md: '12px'}}
    >
      <HStack spacing={{base: '4px', sm: '8px', md: '16px'}}>
        <UploadModal for = "edit" song_id = {song._id} audio_path = {song.audio_path} title = {song.judul}/>
        <DeleteModal song_id = {song._id} title = {song.judul} />
      </HStack>
    </Td>
  </Tr>
  )
}

export default SongRow