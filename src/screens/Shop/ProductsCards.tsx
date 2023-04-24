import { ShopCard } from '@/components/ShopCard'
import { Product } from '@/db/model'
import { useFetchProducts } from '@/utils/useFetchProducts'
import React, { FC } from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'

const styles = StyleSheet.create({
	cardsConteiner: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		gap: 15
	}
})

interface Props {
	ids: string[]
}

const ProductsCard: FC<Props> = ({ ids }) => {
	const productsQuery = useFetchProducts(ids)
	const products = productsQuery.data as Product[]

	if (productsQuery.isLoading) {
		return <ActivityIndicator size={38} color='black' />
	}

	if (productsQuery.isError) {
		return <Text>Error</Text>
	}

	if (!products.length) {
		return <Text>Nothing</Text>
	}

	return (
		<View style={styles.cardsConteiner}>
			{products.map((product) => {
				return <ShopCard {...product} key={product.id} />
			})}
		</View>
	)
}

export default ProductsCard
