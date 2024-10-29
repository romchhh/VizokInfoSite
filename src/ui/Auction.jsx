function Auction({ src, alt, className }) {
	const defaultStyles = 'max-h-20';

	return (
		<div>
			<img
				src={src}
				alt={alt}
				className={className ? className : defaultStyles}
			/>
		</div>
	);
}

export default Auction;
