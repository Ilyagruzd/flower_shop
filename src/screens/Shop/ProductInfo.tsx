import { RouteProp, useRoute } from '@react-navigation/native'
import React from 'react'
import { View, Text } from 'react-native'
import { StackParamList } from '../Shop'
import { Button } from '@rneui/themed'
import Carousel from '@/components/Carousel'
import { doc } from 'firebase/firestore'
import { db } from '@/utils/firebase'
import { useFirestoreDocument } from '@react-query-firebase/firestore'
import { Product } from '@/db/model'

export const ProductInfo = () => {
	const route = useRoute<RouteProp<StackParamList, 'ProductInfo'>>()
	const { productId } = route.params

	const ref = doc(db, 'products', productId)
	const query = useFirestoreDocument(['products', productId], ref)
	const product = query.data?.data() as Product

	if (query.isLoading) {
		return <Text>Loading...</Text>
	}

	if (query.isError) {
		return <Text>Error</Text>
	}

	if (!product) {
		return <Text>Nothing</Text>
	}

	return (
		<View
			style={{
				display: 'flex',
				justifyContent: 'space-between',
				height: '100%'
			}}
		>
			<View>
				<Carousel imageList={product.imageList} />
				<View style={{ padding: 5 }}>
					<Text style={{ fontSize: 24 }}>{product.title}</Text>
					<Text style={{ fontSize: 24 }}>{product.price} ₽</Text>
					<Text style={{ fontSize: 18 }}>{product.description}</Text>
				</View>
			</View>
			<Button size='lg' title='Купить' />
		</View>
	)
}
