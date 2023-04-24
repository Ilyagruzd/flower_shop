import { CartItem, Product } from '@/db/model'
import { NavigationProps } from '@/screens/Shop'
import { useNavigation } from '@react-navigation/native'
import React, { FC, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { View, Text, TouchableOpacity, Image } from 'react-native'

const CartCard: FC<CartItem> = ({ product, count }) => {
	const navigation = useNavigation<NavigationProps>()
	const [localCount, setLocalCount] = useState<number>(count)

	const increaseCount = () => setLocalCount(localCount + 1)
	const decreaseCount = () => setLocalCount(localCount - 1)

	const handleNavigateOnScreen = () => {
		navigation.navigate('ProductInfo', { productId: product.id })
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
								color={localCount === 0 ? 'gray' : 'black'}
								onPress={decreaseCount}
								disabled={localCount === 0}
							/>
						</TouchableOpacity>
						<Text style={{ fontSize: 18, width: 30, textAlign: 'center' }}>
							{localCount}
						</Text>
						<AntDesign
							name='pluscircleo'
							size={24}
							color={localCount === product.count ? 'gray' : 'black'}
							onPress={increaseCount}
							disabled={localCount === product.count}
						/>
					</View>
				</View>
			</View>
			<AntDesign name='delete' size={24} color='black' />
		</View>
	)
}

export default CartCard
