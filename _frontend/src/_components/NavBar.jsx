import { Button, Flex, Text } from '@chakra-ui/react';
import React from 'react'

const NavBar = ({allPageDetails}) => {
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
					onClick={() => {
						console.log('prev clicked');
					}}
				>
					prev
				</Button>
				<Text>{allPageDetails.currPage} of {allPageDetails.totalPages}</Text>
				<Button
					colorScheme='teal'
					variant='outline'
					isDisabled={(allPageDetails.nextPage === null)}
					onClick={() => {
						console.log('next clicked');
					}}
				>
					next
				</Button>
			</Flex>
    )
}

export default NavBar