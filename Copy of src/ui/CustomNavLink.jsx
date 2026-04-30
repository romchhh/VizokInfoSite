import { useLocation } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import { useNavbar } from '../context/NavbarContext';
import { usePagePosition } from '../hooks/usePagePosition';

function CustomNavLink({ to = '#', children }) {
	const location = useLocation();
	const pagePosition = usePagePosition();
	const { isActiveNav, setIsActiveNav } = useNavbar();

	return (
		<Link
			to={to}
			className={
				`${location.pathname}${location.hash}` === to &&
				pagePosition <= 150 &&
				!isActiveNav
					? 'text-white/80'
					: `${location.pathname}${location.hash}` === to &&
					  (pagePosition > 150 || isActiveNav)
					? 'active'
					: ''
			}
			smooth
			onClick={() => setIsActiveNav(false)}
		>
			{children}
		</Link>
	);
}

export default CustomNavLink;
