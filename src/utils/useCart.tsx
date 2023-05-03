import { useEffect, useState } from 'react'
import { Cart } from '@/db/model'
import { User } from 'firebase/auth'
import { useFetchCart } from './useFetchCart'

export interface CartContextInterface {
	activeCart: Cart | undefined
	isLoading: boolean
	isError: boolean
	setActiveCart: React.Dispatch<React.SetStateAction<Cart | undefined>>
}

export function useCart(user: User | undefined) {
	const [activeCart, setActiveCart] = useState<Cart | undefined>(undefined)
	const { cart, isLoading, isError } = useFetchCart(user)

	useEffect(() => {
		setActiveCart(cart)
	}, [JSON.stringify(cart)])

	return { activeCart, isLoading, isError, setActiveCart }
}
