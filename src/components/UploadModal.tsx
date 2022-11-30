import {
    Button, Flex, FormControl,
    FormLabel, IconButton, Input, Modal, ModalBody,
    ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Progress, Spacer, Text, useDisclosure
} from '@chakra-ui/react';

import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage';
import axios from 'axios';
import { SyntheticEvent, useState } from 'react';
import { MdEdit } from "react-icons/md";
import { storage } from '../firebase';

const UploadForm = (props: any) => {
    const [title, setTitle] = useState<string>("");
    const [file, setFile] = useState<File>();
    const [url, setUrl] = useState<string>("");
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

    const sendSong = async(event: SyntheticEvent) => {
        let payload = {};
        if (!file && props.for === "upload") {
            alert("Please upload the song file!")
            return;
        }

        if (file){
            const storageRef = ref(storage, `/files/${file!.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
    
            setUploading(true);
            uploadTask.on("state_changed", 
            (snapshot) => {
                const progressValue = Math.round(snapshot.bytesTransferred * 100 / snapshot.totalBytes) ;
                setProgress(progressValue);
            },
    
                (error: any) => {
                    console.log(error);
                    return;
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl: string) => {
                        setUploading(false);

                        axios({
                            method: props.for === "upload" ? 'post' : 'put',
                            url: `http://localhost:3000/song${props.for !== "upload" ? `/${props.song_id}` : ""}`,
                            data: {
                                judul: title,
                                audio_path: downloadUrl,
                            },
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `${sessionStorage.getItem("auth_token")}`
                            },
  
                          }).then((response) => {
                            if(response.status === 200){
                                setSuccess(true)
                                setTimeout(() => {
                                    window.location.href = '/song'
                                }, 500);
                            }
                        });
                        // axios.{props.for === "upload" ? post : put}(
                        //     `http://localhost:3000/song${props.for !== "upload" ? `/${props.song_id}` : ""}`,{
                        //         judul: title,
                        //         audio_path: downloadUrl,
                        //     },
                        //     {
                        //         // mode: 'cors', 
                        //         headers: {
                        //             'Content-Type': 'application/json',
                        //             'Authorization': `${sessionStorage.getItem("auth_token")}`
                        //         },
                        //     }
                        // ).then((response) => {
                        //     if(response.status === 200){
                        //         setSuccess(true)
                        //         setTimeout(() => {
                        //             window.location.href = '/song'
                        //         }, 500);
                        //     }
                        // })
                    });
                }
            )
        } else {
            axios.put(
                `http://localhost:3000/song${props.for === "edit" ? `/${props.song_id}` : ""}`,{
                    judul: title,
                    audio_path: "",
                },
                {
                    // mode: 'cors', 
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${sessionStorage.getItem("auth_token")}`
                    },
                }
            ).then((response) => {
                if(response.status === 200){
                    setSuccess(true)
                    setTimeout(() => {
                        window.location.href = '/song'
                    }, 500);

                }
            })
        }
    }

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
                <Text hidden={!success}>Song successfully {props.for === 'upload' ? 'uploaded' : 'edited'}!</Text>
                <Spacer/>
                <Button colorScheme='green' mr={3} onClick={sendSong} alignSelf='right' disabled={isUploading} >
                    {props.for === 'upload' ? 'Add Song' : 'Update Song'}
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
          {props.for === "upload" ? <Button onClick={onOpen} variant="solid" colorScheme="teal">Add Song</Button> :
            <IconButton
                aria-label="Edit Song"
                icon={<MdEdit />}
                bg="green.300"
                size="sm"
                onClick={onOpen}
                />
          } 
    
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{props.for === "upload" ? "Add a New" : "Edit"} Song</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <UploadForm for = {props.for} song_id = {props.song_id} onClick = {console.log(props.song_id, props.for)}/>
              </ModalBody>
    
              <ModalFooter>

              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )
}

export default UploadModal;