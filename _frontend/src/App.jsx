import { useEffect, useState } from 'react'
import { accessImage, getImages } from './_utils/api';
import ImageCard from './_components/ImageCard';
import { Box, Button, Center, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import NavBar from './_components/NavBar';
import FormUpload from './_components/FormUpload';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

const App = () => {
	const [images, setImages] = useState([]);

	const [page, setPage] = useState(1); // change this to change the page
	const [limit, setLimit] = useState(10) // change this to change the number of files per page

	const [allPageDetails, setAllPageDetails] = useState({})

	useEffect(() => {
		console.log(import.meta.env.VITE_SERVER_URL);
		console.log(import.meta.env.VITE_AUTH_TOKEN_CLOUD);
		getImages(page, limit).then((data) => {
			// console.log('data :>> ', data);
			// console.log('data.images :>> ', data.images);
			setImages(data.images);
			setAllPageDetails(data.page);
			console.log('data.page :>> ', data.page);
		}).catch((err) => {
			console.log('err :>> ', err);
		});
	}, []);

	return (
		<Box style={{ height: '100%' }}>
			<NavBar allPageDetails={allPageDetails} />
			<VStack>
				<Box>
					<Center m={10}>
						{
							images.map((image, idx) => {
								return <ImageCard key={idx} imageObj={{ ...image }} />
							})
						}
					</Center>
				</Box>
				<Box>
					<FormUpload />
				</Box>
			</VStack>
		</Box>
	)
}

export default App
