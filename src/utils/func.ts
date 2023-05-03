import { Cart, Product } from '@/db/model'
import { db } from './firebase'
import { doc } from 'firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { User } from 'firebase/auth'

export const changeCartItemCount = (
	cart: Cart,
	productId: string,
	count: number
) => {
	const cartItemsWithRef = cart.cartItems.map((cartItem) =>
		cartItem.product.id !== productId
			? {
					...cartItem,
					product: doc(db, 'products', cartItem.product.id)
			  }
			: {
					product: doc(db, 'products', cartItem.product.id),
					count
			  }
	)
	const cartItems = cart.cartItems.map((cartItem) =>
		cartItem.product.id !== productId
			? cartItem
			: {
					...cartItem,
					count
			  }
	)

	const cartWithRef = { ...cart, cartItems: cartItemsWithRef }
	const newCart = { ...cart, cartItems }
	return { cartWithRef, newCart }
}

export const deleteCartItem = (cart: Cart, productId: string) => {
	const index = cart.cartItems.findIndex(
		(cartItem) => cartItem.product.id == productId
	)
	const newCart = { ...cart }
	newCart.cartItems.splice(index, 1)
	const cartItems = newCart.cartItems.map((cartItem) => ({
		...cartItem,
		product: doc(db, 'products', cartItem.product.id)
	}))
	const cartWithRef = { ...newCart, cartItems }
	return { newCart, cartWithRef }
}

export const addCartItem = (cart: Cart, product: Product) => {
	const newCart = { ...cart }
	newCart.cartItems.push({ product, count: 1 })
	const cartItems = cart.cartItems.map((cartItem) => ({
		...cartItem,
		product: doc(db, 'products', cartItem.product.id)
	}))
	const cartWithRef = { ...newCart, cartItems }
	return { newCart, cartWithRef }
}

export const storeUserInStorage = async (user: User) => {
	try {
		await AsyncStorage.setItem('user', JSON.stringify(user))
	} catch (error) {
		console.log(error)
	}
}

export const getUserFromStorage = async (): Promise<User | undefined> => {
	try {
		const user = await AsyncStorage.getItem('user')
		if (user) {
			console.log(user)
			return JSON.parse(user)
		}
	} catch (error) {
		console.log(error)
	}
}
