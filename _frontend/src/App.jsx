import { useEffect, useState } from 'react'
import { getImages } from './_utils/api';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

const App = () => {
	const [images, setImages] = useState([]);

	const [page, setPage] = useState(1); // change this to change the page
	const [limit, setLimit] = useState(10) // change this to change the number of files per page

	useEffect(() => {
		console.log(import.meta.env.VITE_SERVER_URL);
		getImages(page, limit).then((data) => {
			console.log('data :>> ', data);
			setImages(data);
		}).catch((err) => {
			console.log('err :>> ', err);
		});
	},[])

	return (
		<div>
			{

			}

		</div>
	)
}

export default App
