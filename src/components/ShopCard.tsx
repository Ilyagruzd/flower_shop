import { Category, Product } from '@/db/model'
import { NavigationProps } from '@/screens/Shop'
import { useNavigation } from '@react-navigation/native'
import React, { FC } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

export const ShopCard: FC<Product> = ({ title, imageList, price, id }) => {
	const navigation = useNavigation<NavigationProps>()

	const handleNavigateOnScreen = () => {
		navigation.navigate('ProductInfo', { productId: id })
	}

	return (
		<TouchableOpacity onPress={handleNavigateOnScreen} style={{ width: '48%' }}>
			<Image
				source={{ uri: imageList[0] }}
				style={{
					width: '100%',
					height: 200,
					resizeMode: 'contain',
					borderRadius: 10
				}}
			/>
			<View style={{ alignItems: 'center' }}>
				<Text>{title}</Text>
				<Text>{price}</Text>
			</View>
		</TouchableOpacity>
	)
}
