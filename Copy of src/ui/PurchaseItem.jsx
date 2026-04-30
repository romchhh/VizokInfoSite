function PurchaseItem({ title, index, children }) {
	return (
		<div className='max-w-52 flex flex-col items-center gap-5'>
			<div className='text-accent text-3xl font-bold'>{index}</div>
			<div className='w-14 h-14 bg-accent flex justify-center items-center text-white shadow-xl transition-transform duration-300 hover:scale-110'>
				{children}
			</div>
			<h3 className='text-lg font-medium text-center'>{title}</h3>
		</div>
	);
}

export default PurchaseItem;