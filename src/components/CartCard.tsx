import { Cart, CartDb, Product } from '@/db/model'
import { NavigationProps } from '@/screens/Shop'
import { useNavigation } from '@react-navigation/native'
import React, { FC, useContext, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { useFirestoreDocumentMutation } from '@react-query-firebase/firestore'
import { collection, doc } from 'firebase/firestore'
import { db } from '@/utils/firebase'
import { CartContext } from '../../App'
import { changeCartItemCount, deleteCartItem } from '@/utils/func'

interface Props {
	product: Product
	count: number
}

const CartCard: FC<Props> = ({ product, count }) => {
	const navigation = useNavigation<NavigationProps>()
	const cart = useContext(CartContext)

	const mutation = useFirestoreDocumentMutation(
		doc(collection(db, 'carts'), cart!.activeCart!.id),
		{
			merge: true
		}
	)

	const changeCount = (count: number) => {
		const { cartWithRef, newCart } = changeCartItemCount(
			cart!.activeCart!,
			product.id,
			count
		)
		cart?.setActiveCart(newCart)
		mutation.mutate(cartWithRef)
	}

	const handleNavigateOnScreen = () => {
		navigation.navigate('ProductInfo', { productId: product.id })
	}

	const hanleDelete = () => {
		const { cartWithRef, newCart } = deleteCartItem(
			cart!.activeCart!,
			product.id
		)
		cart!.setActiveCart(newCart)
		mutation.mutate(cartWithRef)
	}

	return (
		<View
			style={{
				width: '100%',
				height: 125,
				flexDirection: 'row',
				justifyContent: 'space-between'
			}}
		>
			<View style={{ flexDirection: 'row', height: '100%', gap: 10 }}>
				<TouchableOpacity onPress={handleNavigateOnScreen}>
					<Image
						style={{
							width: 125,
							height: '100%',
							borderRadius: 10
						}}
						source={{ uri: product.imageList[0] }}
					/>
				</TouchableOpacity>
				<View style={{ justifyContent: 'space-between' }}>
					<View>
						<Text style={{ fontSize: 18 }}>{product.title}</Text>
						<Text style={{ fontSize: 18 }}>{product.price} ₽</Text>
					</View>
					<View style={{ flexDirection: 'row', gap: 15 }}>
						<TouchableOpacity>
							<AntDesign
								name='minuscircleo'
								size={24}
								color={count === 0 ? 'gray' : 'black'}
								onPress={() => changeCount(count - 1)}
								disabled={count === 0}
							/>
						</TouchableOpacity>
						<Text style={{ fontSize: 18, width: 30, textAlign: 'center' }}>
							{count}
						</Text>
						<AntDesign
							name='pluscircleo'
							size={24}
							color={count === product.count ? 'gray' : 'black'}
							onPress={() => changeCount(count + 1)}
							disabled={count === product.count}
						/>
					</View>
				</View>
			</View>
			<AntDesign name='delete' size={24} color='black' onPress={hanleDelete} />
		</View>
	)
}

export default CartCard
