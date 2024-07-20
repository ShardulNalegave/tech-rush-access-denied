import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute("/test_feed")({
	component: Test_feed,
});

import { useState } from 'react';
import Popup from 'reactjs-popup';
import sampleImages from '../sampleImages';
export default function Test_feed() {
	const [open, setOpen] = useState(false);
	const [selectedImage, setSelectedImage] = useState(null);
	const [liked, setLiked] = useState(false);

	const handleImageClick = (image) => {
		setSelectedImage(image);
		setOpen(true);
	};

	const closeModal = () => {
		setOpen(false);
		setSelectedImage(null);
	};

	const toggleLike = () => {
		setLiked(!liked);
	};

		
	return (
		
		<div className="col-span-7 grid grid-cols-3 grid-rows-5 gap-2 p-4 overflow-hidden">
			{sampleImages.map((item,index) => (
				<div
					key={index}
					className={`oscillate-${index % 3} h-56 overflow-hidden rounded-lg`}
				>
					<img
						src={item.url}
						className="w-full h-full object-cover"
					/>
				</div>
			))}
		</div>
	);	
}
