import { Center } from '@chakra-ui/react';
import React, { useContext, useEffect } from 'react'
import ImageCard from './ImageCard';
import { PageContext } from '../_utils/context';
import { getImages } from '../_utils/api';

const ImagesList = () => {
    const { images, page, limit, setImages, setPage,setAllPageDetails  } = useContext(PageContext);

    useEffect(() => {
		getImages(page, limit)
			.then((data) => {
				setImages(data.images);
				setAllPageDetails({
					currPage: data.page.currPage,
					nextPage: data.page.nextPage,
					prevPage: data.page.prevPage,
					total: data.page.total,
					totalPages: data.page.totalPages
				});
				// setLimit(data.page.limit);
				setPage(data.page.currPage);
			}).catch((err) => {
				console.log('err :>> ', err);
			});
	}, [page]);

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