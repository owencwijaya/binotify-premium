import { HStack, Td, Tr } from "@chakra-ui/react"
import DeleteModal from "../components/DeleteModal"
import UploadModal from "../components/UploadModal"

export interface Song {
  _id  : string | null,
  judul: string | null,
  audio_path: string | null,
}

export const SongRow = (props: any) => {
  return (
    <Tr
      key={props.song._id}
      borderRadius="md"
      color="black"
      fontWeight="semibold"
      borderBottom="1px solid #e2e8f0"
      _hover={{
        background: "green.100"
      }}
    >
    <Td textAlign="center" px={{ base: '4px', sm:'8px', md: '12px'}}>{props.i + 1}</Td>
    <Td px={{ base: '4px', sm:'8px', md: '12px'}}>{props.song.judul}</Td>
    <Td textAlign="center" px={{ base: '4px', sm:'8px', md: '12px'}}>
      <HStack spacing={{base: '4px', sm: '8px', md: '16px'}}>
        <UploadModal for = "edit" song_id = {props.song._id} audio_path = {props.song.audio_path}/>
        <DeleteModal song_id = {props.song._id} title = {props.song.judul} />
      </HStack>
    </Td>
  </Tr>
  )
}