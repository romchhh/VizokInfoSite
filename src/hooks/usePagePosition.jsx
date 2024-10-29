import { useEffect, useState } from 'react';

export function usePagePosition() {
	const [scrollPosition, setScrollPosition] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			const position = window.scrollY;
			setScrollPosition(position);
		};

		window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return scrollPosition;
}
