import CartCard from '@/components/CartCard'
import { SafeAreaView } from '@/components/SafeAreaView'
import { Cart as CartModel, CartItem, Product, CartDb } from '@/db/model'
import { db } from '@/utils/firebase'
import { changeCartItemCount, deleteCartItem } from '@/utils/func'
import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { User } from 'firebase/auth'
import {
	DocumentReference,
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	where
} from 'firebase/firestore'
import React, { FC, useEffect, useState } from 'react'
import { Text, View } from 'react-native'

interface Props {
	user: User
}

export const Cart: FC<Props> = ({ user }) => {
	const [activeCart, setActiveCart] = useState<CartModel>()

	const ref = query(
		collection(db, 'carts'),
		where('userId', '==', 'knZJ31GVr1UrUyNQKtncqat3sut1')
	)
	const dataQuery = useFirestoreQueryData(
		['carts', 'knZJ31GVr1UrUyNQKtncqat3sut1'],
		ref
	)
	const cart = dataQuery.data as CartModel[]

	useEffect(() => {
		if (cart && cart?.length) {
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
				const activeCart = { ...cart[0], cartItems }
				setActiveCart(activeCart)
			}
			fetch()
		}
	}, [cart])

	const handleChangeCount = (id: string, count: number) => {
		const { cartWithRef, newCart } = changeCartItemCount(activeCart!, id, count)
		setActiveCart(newCart)
		return cartWithRef
	}

	const handleDelete = (id: string) => {
		const { cartWithRef, newCart } = deleteCartItem(activeCart!, id)
		setActiveCart(newCart)
		return cartWithRef
	}

	if (dataQuery.isLoading) {
		return <Text>Loading...</Text>
	}

	if (dataQuery.isError) {
		return <Text>error</Text>
	}

	if (!activeCart?.cartItems.length) {
		return <Text>Nothing</Text>
	}

	return (
		<SafeAreaView>
			<View style={{ padding: 10 }}>
				<Text style={{ fontSize: 32, paddingBottom: 15 }}>Корзина</Text>
				<View style={{ gap: 10 }}>
					{activeCart.cartItems.map((item) => (
						<CartCard
							product={item.product}
							count={item.count}
							cart={activeCart}
							increaseCountDb={() =>
								handleChangeCount(item.product.id, item.count + 1)
							}
							decreaseCountDb={() =>
								handleChangeCount(item.product.id, item.count - 1)
							}
							deleteCartItem={() => handleDelete(item.product.id)}
							key={item.product.id}
						/>
					))}
				</View>
			</View>
		</SafeAreaView>
	)
}
