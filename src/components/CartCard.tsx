import { Cart, CartDb, Product } from '@/db/model'
import { NavigationProps } from '@/screens/Shop'
import { useNavigation } from '@react-navigation/native'
import React, { FC, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { useFirestoreDocumentMutation } from '@react-query-firebase/firestore'
import { collection, doc } from 'firebase/firestore'
import { db } from '@/utils/firebase'

interface Props {
	product: Product
	count: number
	cart: Cart
	increaseCountDb: () => CartDb
	decreaseCountDb: () => CartDb
	deleteCartItem: () => CartDb
}

const CartCard: FC<Props> = ({
	product,
	count,
	cart,
	decreaseCountDb,
	increaseCountDb,
	deleteCartItem
}) => {
	const navigation = useNavigation<NavigationProps>()

	const mutation = useFirestoreDocumentMutation(
		doc(collection(db, 'carts'), cart.id),
		{
			merge: true
		}
	)

	const increaseCount = () => {
		mutation.mutate(increaseCountDb())
	}

	const decreaseCount = () => {
		mutation.mutate(decreaseCountDb())
	}

	const handleNavigateOnScreen = () => {
		navigation.navigate('ProductInfo', { productId: product.id })
	}

	const hanleDelete = () => {
		mutation.mutate(deleteCartItem())
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
								onPress={decreaseCount}
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
							onPress={increaseCount}
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
