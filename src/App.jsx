import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavbarProvider } from './context/NavbarContext';
import Header from './ui/Header';
import HomePage from './ui/HomePage';
import CreateRoute from './ui/CreateRoute';
import SearchRoute from './ui/SearchRoute';

function App() {
	return (
		<NavbarProvider>
			<ToastContainer />
			<div className='min-h-[150vh]'>
				<Routes>
					<Route path="/" element={
						<>
							<Header />
							<HomePage />
						</>
					} />
					<Route path="/create" element={<CreateRoute />} />
					<Route path="/search" element={<SearchRoute />} />
				</Routes>
			</div>
		</NavbarProvider>
	);
}

export default App;
