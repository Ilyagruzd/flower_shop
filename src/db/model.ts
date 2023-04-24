export interface Category {
	id: string
	title: string
}

export interface Product {
	id: string
	title: string
	imageList: string[]
	description: string
	category: Category
	price: number
	count: number
}

export interface CartItem {
	product: Product
	count: number
}

export interface Cart {
	id: string
	userId: string
	cartItems: CartItem[]
}

export interface User {
	id: string
	firstName: string
	lastName: string
	email: string
	password: string
}
