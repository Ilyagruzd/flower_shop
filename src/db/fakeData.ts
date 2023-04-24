import { Category, Product } from './model'

export const fakeProducts: Product[] = [
	{
		id: '1',
		title: 'Букет №1',
		imageUri: [
			'https://roots-store.ru/upload/images/products/o/0c8172fbdbc6fef1d44386ee94e77746.jpg',
			'https://roots-store.ru/upload/images/products/o/fddbb0739e42a3cdc2dac5842612bdfd.jpg',
			'https://roots-store.ru/upload/images/products/o/5c4e260e59a3ce9c99dbdc611b34bde1.jpg'
		],
		description: 'Очень красивый первый букет',
		category: [
			{
				id: '11',
				title: 'Категория'
			}
		],
		price: 2000,
		count: 10
	},
	{
		id: '2',
		title: 'Букет №2',
		imageUri: [
			'https://roots-store.ru/upload/images/products/o/fddbb0739e42a3cdc2dac5842612bdfd.jpg'
		],
		description: 'Очень красивый второй букет',
		category: [
			{
				id: '11',
				title: 'Категория'
			}
		],
		price: 2000,
		count: 10
	},
	{
		id: '3',
		title: 'Букет №3',
		imageUri: [
			'https://roots-store.ru/upload/images/products/o/5c4e260e59a3ce9c99dbdc611b34bde1.jpg'
		],
		description: 'Очень красивый второй букет',
		category: [
			{
				id: '11',
				title: 'Категория'
			}
		],
		price: 2000,
		count: 10
	},
	{
		id: '4',
		title: 'Букет №4',
		imageUri: [
			'https://roots-store.ru/upload/images/products/o/9b28ebdfa564cb70b7e9894a617dd15f.jpg'
		],
		description: 'Очень красивый второй букет',
		category: [
			{
				id: '11',
				title: 'Категория'
			}
		],
		price: 2000,
		count: 10
	}
]

export const fakeCategories: Category[] = [
	{
		id: '11',
		title: 'Монобукет'
	},
	{
		id: '12',
		title: 'Авторский букет'
	},
	{
		id: '13',
		title: 'Композиция'
	},
	{
		id: '14',
		title: 'Роза'
	}
]
