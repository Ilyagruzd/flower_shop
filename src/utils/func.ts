import { Cart } from '@/db/model'
import { db } from './firebase'
import { doc } from 'firebase/firestore'

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
