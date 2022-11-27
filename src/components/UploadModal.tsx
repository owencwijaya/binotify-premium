import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Heading,
    useDisclosure,
    Flex,
    Spacer,
    Progress,
    Text
} from '@chakra-ui/react'

import axios from 'axios';
import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage'
import { SyntheticEvent } from 'react';
import { storage } from '../firebase';
import { useState } from 'react'

const UploadForm = (props: any) => {
    const [title, setTitle] = useState<string>("");
    const [file, setFile] = useState<File>();
    const [progress, setProgress] = useState<number>(0);
    const [isUploading, setUploading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    const handleAudioFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const retrievedFile: File = event.target.files![0];
        console.log(retrievedFile);
        setFile(retrievedFile);
        console.log(file)
    }

    const handleTitleChange = (event: any) => setTitle(event.target.value);

    const sendSong = (event: SyntheticEvent) => {
        console.log(file)
        if (!file) {
            alert("Please upload the song file!")
            return;
        }

        const storageRef = ref(storage, `/files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        setUploading(true);
        uploadTask.on("state_changed", (snapshot) => {
            const progressValue = Math.round(snapshot.bytesTransferred * 100 / snapshot.totalBytes) ;
            setProgress(progressValue);
        },

        (error) => {
            console.log(error);
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                setUploading(false);
                if (title === "") {
                    alert("Please enter a title!");
                    return;
                }

                if (url === undefined) {
                    alert("Please select a file to be uploaded!");
                    return;
                }
                fetch(
                    'http://localhost:3000/song',
                    {
                        method: 'POST',
                        // mode: 'cors', 
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzgxYTliMTc3YzRlZWJiNjdkMWNjNDYiLCJpYXQiOjE2Njk1MzMwMTQsImV4cCI6MTY2OTUzNjYxNH0.kmfw0mc4fBgHNW6PbF7tnHWP5-3MkwicPaZSXhXXTac'
                        },
                        body: JSON.stringify({
                            'judul': title,
                            'audio_path': url
                        })
                    }
                ).then((response) => {
                    if(response.status === 200){
                        setSuccess(true)
                    }
                })
            });
        }
        
    )}

    return(
        <>
            <FormControl>
                <FormLabel>Song Title</FormLabel>
                <Input type = 'name' value = {title} onChange = {handleTitleChange} />
                <FormLabel mt = {5}>Song File</FormLabel>
                <Input py = {1} type = 'file' onChange = {handleAudioFile}/>
            </FormControl>
            <Progress colorScheme='green' size='md'  mt = {5} value = {progress}/>
            <Flex dir = "row" mt = {5}>
                <Text hidden={!success}>Song successfully uploaded!</Text>
                <Spacer/>
                <Button colorScheme='green' mr={3} onClick={sendSong} alignSelf='right' disabled={isUploading} >
                    Add Song
                </Button>
            </Flex>

        </>
    )
}

const UploadModal = (props: any) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ isUploading, setUploading ] = useState(false);
    return (
        <>
          <Button onClick={onOpen}>Add Song</Button>
    
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add a New Song</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <UploadForm/>
              </ModalBody>
    
              <ModalFooter>

              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )
}

export default UploadModal;