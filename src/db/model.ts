import { DocumentData, DocumentReference } from 'firebase/firestore'

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

export interface ProductDb {
	id: string
	title: string
	imageList: string[]
	description: string
	category: ref
	price: number
	count: number
}

export interface CartItem {
	product: Product
	count: number
}

export interface CartItemDb {
	product: ref
	count: number
}

type ref = DocumentReference<DocumentData>

export interface Cart {
	id: string
	userId: string
	cartItems: CartItem[]
}

export interface CartDb {
	id: string
	userId: string
	cartItems: CartItemDb[]
}

export interface User {
	id: string
	firstName: string
	lastName: string
	email: string
	password: string
}
