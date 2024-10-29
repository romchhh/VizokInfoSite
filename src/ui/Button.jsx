function Button({ children, className }) {
	return (
		<button
			className={`bg-accent font-medium px-8 py-3 text-base rounded-2xl ${className}`}
			style={{ background: 'linear-gradient(to right, #6B0000, #8B0000)' }}
			onMouseEnter={(e) =>
				(e.target.style.background = 'linear-gradient(to right, #8B0000, #A00000)')
			}
			onMouseLeave={(e) =>
				(e.target.style.background = 'linear-gradient(to right, #6B0000, #8B0000)')
			}
		>
			{children}
		</button>
	);
}

export default Button;
