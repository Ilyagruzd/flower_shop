import { Cart, CartDb, Product } from '@/db/model'
import { User } from 'firebase/auth'
import {
	DocumentData,
	DocumentReference,
	FirestoreError,
	collection,
	getDoc,
	getDocs,
	query,
	where
} from 'firebase/firestore'
import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { db } from './firebase'
import { useEffect, useState } from 'react'
import { UseQueryResult } from 'react-query'

type DataQuery = UseQueryResult<DocumentData[], FirestoreError>

export function useFetchCart(user: User | undefined) {
	const [cart, setCart] = useState<Cart | undefined>(undefined)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isError, setIsError] = useState<boolean>(false)

	useEffect(() => {
		if (user) {
			const fetchCart = async () => {
				try {
					setIsLoading(true)
					const ref = query(
						collection(db, 'carts'),
						where('userId', '==', 'knZJ31GVr1UrUyNQKtncqat3sut1')
					)
					const queryData = await getDocs(ref)
					const carts = queryData.docs.map((doc) => doc.data()) as CartDb[]
					const activeCartWithRef = carts[0]

					const refs = activeCartWithRef.cartItems.map(
						(el) => el.product as unknown as DocumentReference<unknown>
					)
					const docsSnap = refs.map(async (ref) => (await getDoc(ref)).data())
					const promiseAll = await Promise.all(docsSnap)
					const cartItems = promiseAll.map((doc, index) => ({
						product: doc as Product,
						count: activeCartWithRef.cartItems[index].count as number
					}))
					const activeCart = { ...activeCartWithRef, cartItems }
					setCart(activeCart)
					setIsLoading(false)
				} catch (error) {
					console.log(error)
					setIsError(true)
				}
			}
			fetchCart()
		}
	}, [JSON.stringify(user)])

	return { cart, isLoading, isError }
}
