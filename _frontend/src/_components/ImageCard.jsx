import React, { useContext, useEffect, useState } from 'react'
import { Card, CardHeader, CardBody, CardFooter, Image, Text, Center } from '@chakra-ui/react'
import { accessImage } from '../_utils/api';
import { PageContext } from '../_utils/context';

const ImageCard = ({ imageObj }) => {

    const {page} = useContext(PageContext);

    const [imageUrl, setImageUrl] = useState('');
    const [cleanImageName, setCleanImageName] = useState('');

    useEffect(() => {
        // console.log('props :>> ', props);
        // console.log('imageObj :>> ', imageObj);
        accessImage(imageObj.originalname).then((blob) => {
            const url = URL.createObjectURL(blob);
            setImageUrl(url);
        }).then(() => {
            const imageName = imageObj.originalname.split('.');
            imageName.splice(-1, 1);
            setCleanImageName(imageName.join(' '));
        });
        
        // cleanup the object url
        return () => {
            URL.revokeObjectURL(imageUrl);
        };

    }, [page]);


    if (!imageUrl) {
        return <Text fontSize={'md'}>Loading Image...</Text>
    }

    return (
        <Card maxW='sm' borderRadius='md' p={4} border={4} m={4} boxShadow={'md'}>
            {
                !imageUrl ? (
                    <Text>Loading Image...</Text>
                )
                : 
                (
                    <CardBody>
                        <Image
                            objectFit='cover'
                            src={imageUrl}
                            alt={imageObj.originalname}
                            boxSize='200px'
                            borderRadius='md'
                        />
                        <Center>
                            <Text fontSize='md' fontWeight='bold' mt={2}>{cleanImageName}</Text>
                        </Center>
                    </CardBody>
                )

            }
        </Card>
    )
}

export default ImageCard;