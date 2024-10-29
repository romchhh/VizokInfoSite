function Button2({ children, className }) {
	return (
		<button
			className={`bg-accent hover:bg-accent-hover font-medium px-8 py-3 text-base rounded-2xl ${className}`}
		>
			{children}
		</button>
	);
}

export default Button2;