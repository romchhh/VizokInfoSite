import {
	FaFileInvoice,
	FaSearch,
	FaClipboardList,
	FaCar,
} from 'react-icons/fa';
import { GiAutoRepair } from 'react-icons/gi';
import { RiAuctionFill } from 'react-icons/ri';
import PurchaseItem from './PurchaseItem';

// Оновлений масив з новими іконками
const PURCHASES = [
	{
		img: <FaFileInvoice size={24} className="icon" />,
		title: 'Заявка на сайті або на телеграмі',
	},
	{
		img: <FaSearch size={24} className="icon" />,
		title: 'Консультація та підбір функціоналу під ваші потреби, аудит вашого бізнесу та процесів',
	},
	{ img: <FaClipboardList size={24} className="icon" />, title: 'Проєктування функціоналу' },
	{
		img: <RiAuctionFill size={24} className="icon" />,
		title: 'Розробка чат-бота',
	},
	{ img: <GiAutoRepair size={24} className="icon" />, title: 'Тестування результатів' },
	{ img: <FaCar size={24} className="icon" />, title: 'Запуск проєкту та готовий чат бот' },
];

function Purchase() {
	return (
		<section
			id='purchase-scheme'
			className='min-h-screen flex items-center justify-center py-5'
		>
			<div className='container flex flex-col gap-24'>
				<h2 className='text-5xl font-bold lg:text-left text-center'>
					Як ми працюємо?
				</h2>
				<div className='inline-flex gap-4 flex-wrap justify-center m-auto'>
					{PURCHASES.map((item, index) => (
						<PurchaseItem index={index + 1} title={item.title} key={index}>
							{item.img}
						</PurchaseItem>
					))}
				</div>
			</div>
		</section>
	);
}

export default Purchase;