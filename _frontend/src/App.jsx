import { useContext, useEffect, useState } from 'react'
import { accessImage, getImages } from './_utils/api';
import ImageCard from './_components/ImageCard';
import { Box, Button, Center, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import NavBar from './_components/NavBar';
import FormUpload from './_components/FormUpload';
import ImagesList from './_components/ImagesList';
import { createContext } from 'react';
import { PageContext } from './_utils/context';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

const App = () => {

	const [images, setImages] = useState([]);

	const [page, setPage] = useState(1); // change this to change the page
	const [limit, setLimit] = useState(2) // change this to change the number of files per page
	const [allPageDetails, setAllPageDetails] = useState({
		currPage: 1,
		nextPage: null,
		prevPage: null,
		total: 1,
		totalPages: 1
	});


	return (
		<PageContext.Provider value={{ page, setPage, images, setImages, limit, setLimit, allPageDetails, setAllPageDetails }}>
			<Box style={{ height: '100%' }}>
				<NavBar />
				<VStack>
					<Box>
						<ImagesList />
					</Box>
					<Box>
						<FormUpload />
					</Box>
				</VStack>
			</Box>
		</PageContext.Provider>
	)
}

export default App
