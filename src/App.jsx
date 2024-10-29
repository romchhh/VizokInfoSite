import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavbarProvider } from './context/NavbarContext';
import About from './ui/About';
import Advantages from './ui/Advantages';
import Header from './ui/Header';
import Hero from './ui/Hero';
import Purchase from './ui/Purchase';
import Socials from './ui/Socials';
import Reviews from './ui/Reviews';
import Portfolio from './ui/Portfolio';
import Footer from './ui/Footer';

function App() {
	return (
		<NavbarProvider>
			<ToastContainer />
			<div className='min-h-[150vh]'>
				<Header />
				<main>
					<Hero />
					<About />
					<Advantages />
					<Purchase />
					<Socials />
					<Portfolio />
					<Reviews/>
					<Footer/>
				</main>
			</div>
		</NavbarProvider>
	);
}

export default App;
