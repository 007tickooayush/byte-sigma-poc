import { Button, Flex, Text } from '@chakra-ui/react';
import React, { useContext, useEffect } from 'react'
import { PageContext } from '../_utils/context';
import { getImages } from '../_utils/api';

const NavBar = () => {

	const { allPageDetails, setAllPageDetails, setPage, page, setImages, limit, setLimit } = useContext(PageContext);

	const handlePrevPage = () => {
		setPage(page => page - 1);
	};

	const handleNextPage = () => {
		setPage(page => page + 1);
	};

	return (
		<Flex
			p={4}
			shadow="xl"
			border="2rem"
			borderColor="black"
			justify="space-around"
			align="center"
			borderBottomRadius="2rem"
			direction={{ base: "column", md: "row" }}
		>

			<Button
				colorScheme='teal'
				variant='outline'
				isDisabled={allPageDetails.prevPage === null}
				onClick={() => handlePrevPage()}
			// onClick={() => setPage((page) => page - 1)}
			>
				prev
			</Button>
			<Text>{allPageDetails.currPage} of {allPageDetails.totalPages}</Text>
			<Button
				colorScheme='teal'
				variant='outline'
				isDisabled={(allPageDetails.nextPage === null)}
				onClick={() => handleNextPage()}
			// onClick={() => setPage((page) => page + 1)}
			>
				next
			</Button>
		</Flex>
	)
}

export default NavBar