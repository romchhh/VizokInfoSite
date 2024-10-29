import { useEffect } from 'react';
import { MdClose, MdMenu } from 'react-icons/md';
import { useNavbar } from '../context/NavbarContext';
import { usePagePosition } from '../hooks/usePagePosition';
import Button from './Button';
import Navbar from './Navbar';

function Header() {
	const pagePosition = usePagePosition();
	const { isActiveNav, setIsActiveNav } = useNavbar();

	const activeStyles = pagePosition > 150 ? 'bg-white' : '';

	const handleToggleNavbar = () => {
		setIsActiveNav((state) => !state);
	};

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	useEffect(() => {
		if (isActiveNav) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
	}, [isActiveNav]);

	return (
		<header className={`${activeStyles} fixed duration-500 z-50 w-full py-3`}>
			<div className='flex justify-between items-center container 2xl:gap-28 relative gap-14'>
				<div
					onClick={scrollToTop}
					className='z-30 relative flex items-end xl:text-4xl text-2xl uppercase font-medium gap-2 cursor-pointer'
				>
					<img src='logo.png' alt='logo' className='xl:max-h-20 max-h-14' />
					<span className='xl:py-4 py-2 font-oswald logo'>telebots</span>
				</div>
				<div
					className={`flex lg:justify-between flex-1 justify-center items-center lg:relative fixed lg:bg-transparent bg-white flex-col lg:flex-row z-40 w-full h-full top-[-100%] left-0 gap-10 lg:gap-0 duration-500 ${
						isActiveNav ? 'active-navbar' : ''
					}`}
				>
					<nav className={`lg:flex-1 flex`}>
						<Navbar />
					</nav>
					<div className='2xl:max-w-[500px] xl:max-w-[400px] xl:w-full flex justify-center text-white'>
						<a href='https://t.me/nowayrm' target='_blank' rel='noopener noreferrer'>
							<Button>Зв'яжіться з нами</Button>
						</a>
					</div>
				</div>
				<div className='block lg:hidden z-50'>
					<button
						className='bg-accent p-2 rounded-xl text-white'
						onClick={handleToggleNavbar}
					>
						{!isActiveNav && <MdMenu size={28} />}
						{isActiveNav && <MdClose size={28} />}
					</button>
				</div>
			</div>
		</header>
	);
}

export default Header;
