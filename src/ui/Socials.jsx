import { FaInstagram, FaTelegram, FaTiktok } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Button from './Button';

function Socials() {
	return (
		<section className='min-h-screen socials py-10'>
			<div className='z-100'>
				<h2 className='text-4xl font-bold text-black text-center'>
					Наш блог
				</h2>
				<p className='text-center text-black py-10 text-xl '>
					Підписуйся на наші соціальні мережі і стеж за новинками з світу чат-ботів
				</p>
				<div className='flex justify-center gap-10 flex-wrap'>

				<Link to='https://www.instagram.com/telebotsnowayrm' target="_blank" rel="noopener noreferrer">
				<Button className='text-white'>
					<FaInstagram size={24} />
				</Button>
			</Link>
			<Link to='https://t.me/nowayrm' target="_blank" rel="noopener noreferrer">
				<Button className='text-white bg-[#24A1DE] hover:bg-blue-400'>
					<FaTelegram size={24} />
				</Button>
			</Link>

				</div>
				<div className='flex justify-center gap-10 mt-10 flex-wrap'>
					<article className='overflow-hidden rounded-xl inline-block'>
						<img src='inst.jpg' alt='instagram' className='max-h-[500px]' />
					</article>
					<article className='overflow-hidden rounded-xl inline-block'>
						<img src='tg.jpg' alt='telegram' className='max-h-[500px]' />
					</article>

				</div>
			</div>
		</section>
	);
}

export default Socials;
