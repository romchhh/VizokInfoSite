import About from './About';
import Advantages from './Advantages';
import Hero from './Hero';
import Purchase from './Purchase';
import Socials from './Socials';
import Reviews from './Reviews';
import Portfolio from './Portfolio';
import Footer from './Footer';
import Prices from './Prices';

function HomePage() {
    return (
        <main>
            <Hero />
            <About />
            <Advantages />
            <Prices />
            <Purchase />
            <Socials />
            <Portfolio />
            <Reviews />
            <Footer />
        </main>
    );
}

export default HomePage; 