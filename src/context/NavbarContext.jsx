import { createContext, useContext, useState } from 'react';

const NavbarContext = createContext();

function NavbarProvider({ children }) {
	const [isActiveNav, setIsActiveNav] = useState(false);

	return (
		<NavbarContext.Provider value={{ isActiveNav, setIsActiveNav }}>
			{children}
		</NavbarContext.Provider>
	);
}

function useNavbar() {
	const context = useContext(NavbarContext);

	if (context === undefined)
		throw new Error('Navbar Context uses outside the Navbar Provider');

	return context;
}

export { NavbarProvider, useNavbar };
