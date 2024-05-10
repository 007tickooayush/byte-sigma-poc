import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

const App = () => {
	const [images, setImages] = useState([]);
	const page = 1; // change this to change the page
	const limit = 10; // change this to change the number of files per page

	useEffect(() => {
		const arrayBufferToBase64 = (buffer) => {
			const binary = new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), '');
			return window.btoa(binary);
		};
		// const arrayBufferToBase64 = (buffer) => {
		// 	var binary = '';
		// 	var bytes = [].slice.call(new Uint8Array(buffer));
		// 	bytes.forEach((b) => binary += String.fromCharCode(b));
		// 	return window.btoa(binary);
		// };

		fetch(`${import.meta.env.VITE_API_URL}/uploads?page=${page}&limit=${limit}`, {
			method: 'GET',
			// headers: {
			// 	'Authorization': `Bearer ${yourToken}`
			// }
		})
			.then(data => data.json())
			.then(data => {
				console.log('data :>> ', data);
				data.forEach(image => {
					let base64Flag = 'data:image/jpeg;base64,';
					let imageStr = arrayBufferToBase64(image.buffer.data);
					setImages([...images, { path: base64Flag + imageStr }])
				});
			})
			.catch(error => console.error(error));
	}, [page, limit]);

	// rest of your code...

	return (
		<div>
			{images.map((image, index) => (
				<img key={index} src={image.path} alt={`Image ${index}`} />
			))}
		</div>

	)
}

export default App
