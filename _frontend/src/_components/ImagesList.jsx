import { Center } from '@chakra-ui/react';
import React, { useContext } from 'react'
import ImageCard from './ImageCard';
import { PageContext } from '../_utils/context';

const ImagesList = () => {
    const { images } = useContext(PageContext);
    return (
        <Center m={10}>
            {
                images.map((image, idx) => {
                    return <ImageCard key={idx} imageObj={{ ...image }} />
                })
            }
        </Center>
    )
}

export default ImagesList;