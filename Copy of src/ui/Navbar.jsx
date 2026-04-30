import { useNavbar } from '../context/NavbarContext';
import { usePagePosition } from '../hooks/usePagePosition';
import CustomNavLink from './CustomNavLink';

function Navbar() {
	const pagePosition = usePagePosition();
	const { isActiveNav } = useNavbar();

	return (
		<ul
			className={`flex ${
				pagePosition < 150 || isActiveNav ? 'text-black' : 'text-black'
			}  gap-10 z-30 lg:flex-row justify-start lg:text-lg text-2xl flex-col top-1/2 text-center`}
		>
			<li>
				<CustomNavLink to='#about'>Про нас</CustomNavLink>
			</li>
			<li>
				<CustomNavLink to='#advantages'>Переваги</CustomNavLink>
			</li>
			<li>
				<CustomNavLink to='#portfolio'>Розіграші</CustomNavLink>
			</li>
			<li>
				<CustomNavLink to='#reviews'>Відгуки</CustomNavLink>
			</li>
		</ul>
	);
}

export default Navbar;
