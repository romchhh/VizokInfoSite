function Button({ children, className }) {
	return (
		<button
			className={`bg-accent font-medium px-8 py-3 text-base rounded-2xl ${className}`}
			style={{
				background: 'linear-gradient(to right, rgb(120, 160, 200), rgb(100, 170, 120))', // М'який перехід між блакитним і зеленим
			}}
			onMouseEnter={(e) =>
				(e.target.style.background = 'linear-gradient(to right, rgb(110, 150, 180), rgb(90, 160, 110))') // Трохи приглушені відтінки при наведенні
			}
			onMouseLeave={(e) =>
				(e.target.style.background = 'linear-gradient(to right, rgb(120, 160, 200), rgb(100, 170, 120))')
			}
		>
			{children}
		</button>
	);
}

export default Button;
