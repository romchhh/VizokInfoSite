import { InputMask } from '@react-input/mask';
import { useRef } from 'react';

function PhoneInput({ name, required = false, children }) {
	const inputRef = useRef(null);

	const onFocus = () => {
		inputRef.current.value = '+38-(0__)-___-__-__';
	};

	const onBlur = () => {
		if (inputRef.current.value === '+38-(0__)-___-__-__') {
			inputRef.current.value = '';
		}
	};

	return (
		<div className='custom-input w-full'>
			<InputMask
				name={name}
				id={name}
				className='w-full h-[60px]'
				type='text'
				mask={'+38-(0__)-___-__-__'}
				replacement={{ _: /\d/ }}
				required={required}
				showMask={false}
				onFocus={onFocus}
				ref={inputRef}
				onBlur={onBlur}
				autoComplete='off'
			/>
			<label htmlFor={name}>{children}</label>
		</div>
	);
}

export default PhoneInput;
