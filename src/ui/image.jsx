import React, { useState } from 'react';

function YourComponent() {
	const [isHovered, setIsHovered] = useState(false);

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	return (
		<div>
			{/* Зображення */}
			<img
				src='/public/herohelp.png'
				alt='Опис зображення'
				className='absolute bottom-[-50px] right-0 sm:bottom-[0px] sm:right-1/3 max-w-[150px] md:max-w-[200px] lg:max-w-[300px] mb-12 lg:mb-0'
				style={{
					transition: 'transform 0.3s ease',
					transform: isHovered ? 'scale(1.1)' : 'scale(1)',
				}}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			/>
		</div>
	);
}

export default YourComponent;
