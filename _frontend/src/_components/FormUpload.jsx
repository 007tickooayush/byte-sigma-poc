import { Button, Center, Flex, Input } from '@chakra-ui/react'
import React from 'react'
import { uploadImage, url } from '../_utils/api';

const FormUpload = ({ setImages, images }) => {

    /**
     * 
     * @param {React.FormEvent} e form event object
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formObj = Object.fromEntries(formData.entries());
        // console.log('formObj :>> ', formObj);

        // fetch(`${url}upload-file`, {
        //     method: 'POST',
        //     body: formData
        // })
        // .then(response => response.json())
        // .then(result => {
        //     console.log('Success:', result);
        // })
        // .catch(error => {
        //     console.error('Error:', error);
        // });

        uploadImage(formData)
            .then((data) => {
                window.location.reload();
                console.log('data :>> ', data);
                // setImages(images.unshift(data.file));
                // setImages([data.file, ...images]);
            }).catch((err) => {
                console.log('err :>> ', err);
            });

    }
    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <Flex
                justifyContent={'center'}
                flexDir={'column'}
                alignItems={'center'}
            >
                <Input
                    type='file'
                    accept='image/*'
                    multiple={false}
                    name='file'
                    variant='outline'
                    borderColor='gray.300'
                    borderRadius='md'
                    p={2}
                    mr={2}
                />
                <Button
                    type='submit'
                    size='md'
                    border='2px'
                    colorScheme='blue'
                    variant={'outline'}
                    fontSize={'sm'}
                    m={2}
                    p={2}
                >
                    Upload Image
                </Button>
            </Flex>
        </form>
    )
}

export default FormUpload