import CartCard from '@/components/CartCard'
import { SafeAreaView } from '@/components/SafeAreaView'
import { Cart as CartModel, CartItem, Product } from '@/db/model'
import { db } from '@/utils/firebase'
import { useAuthentication } from '@/utils/useAuthentication'
import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import {
	DocumentReference,
	collection,
	getDoc,
	query,
	where
} from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'

export const Cart = () => {
	const { user } = useAuthentication()
	const [cartItems, setCartItems] = useState<CartItem[]>()

	const ref = query(collection(db, 'carts'), where('userId', '==', user.uid))
	const dataQuery = useFirestoreQueryData(['carts', user.uid], ref)
	const cart = dataQuery.data as CartModel[]

	useEffect(() => {
		if (cart?.length) {
			const fetch = async () => {
				const refs = cart[0].cartItems.map(
					(el) => el.product as unknown as DocumentReference<unknown>
				)
				const docsSnap = refs.map(async (ref) => (await getDoc(ref)).data())
				const promiseAll = await Promise.all(docsSnap)
				const cartItems = promiseAll.map((doc, index) => ({
					product: doc as Product,
					count: cart[0].cartItems[index].count as number
				}))
				setCartItems(cartItems)
			}
			fetch()
		}
	}, [cart])

	if (dataQuery.isError) {
		return <Text>error</Text>
	}

	if (!cartItems?.length) {
		return <Text>Nothing</Text>
	}

	return (
		<SafeAreaView>
			<View style={{ padding: 10 }}>
				<Text style={{ fontSize: 32, paddingBottom: 15 }}>Корзина</Text>
				{cartItems.map((item) => (
					<View>
						<Text>{item.product.title}</Text>
						<Text>{item.count}</Text>
					</View>
				))}
				{/* <CartCard product={fakeProducts[0]} count={5} /> */}
			</View>
		</SafeAreaView>
	)
}
