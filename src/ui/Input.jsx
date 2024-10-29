import { useState } from 'react';

function Input({
	name,
	children,
	type = 'text',
	required = false,
	initialValue = '',
}) {
	const [value, setValue] = useState(initialValue);

	const handleChange = (newValue) => {
		setValue(newValue);
	};

	return (
		<div className='custom-input w-full'>
			<input
				type={type}
				name={name}
				id={name}
				required={required}
				className='w-full h-[60px]'
				value={value}
				onChange={(e) => handleChange(e.target.value)}
				autoComplete='off'
			/>
			<label htmlFor={name}>{children}</label>
		</div>
	);
}

export default Input;
