import CartCard from '@/components/CartCard'
import { SafeAreaView } from '@/components/SafeAreaView'
import { changeCartItemCount, deleteCartItem } from '@/utils/func'
import { CartContext } from '../../App'
import React, { useContext } from 'react'
import { Text, View } from 'react-native'

export const Cart = () => {
	const cart = useContext(CartContext)

	if (!cart) {
		return <Text>pls login</Text>
	}

	if (cart.isLoading) {
		return <Text>Loading...</Text>
	}

	if (cart.isError) {
		return <Text>error</Text>
	}

	if (!cart.activeCart || !cart.activeCart.cartItems.length) {
		return <Text>Nothing</Text>
	}

	return (
		<SafeAreaView>
			<View style={{ padding: 10 }}>
				<Text style={{ fontSize: 32, paddingBottom: 15 }}>Корзина</Text>
				<View style={{ gap: 10 }}>
					{cart.activeCart.cartItems.map((item) => (
						<CartCard
							product={item.product}
							count={item.count}
							key={item.product.id}
						/>
					))}
				</View>
			</View>
		</SafeAreaView>
	)
}
