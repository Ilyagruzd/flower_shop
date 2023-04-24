import Chip from '@/components/Chip'
import { SafeAreaView } from '@/components/SafeAreaView'
import React, { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { db } from '@/utils/firebase'
import { query, collection } from 'firebase/firestore'
import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import ProductsCards from './ProductsCards'

export const ProductCatalog = () => {
	const [activeCategories, setActiveCategories] = useState<string[]>([])

	const categoryRef = query(collection(db, 'categories'))
	const categoryQuery = useFirestoreQueryData(['categories'], categoryRef)
	const categories = categoryQuery.data

	if (categoryQuery.isLoading) {
		return <Text>Loading...</Text>
	}

	if (categoryQuery.isError) {
		return <Text>Error</Text>
	}

	if (!categories?.length) {
		return <Text>Nothing</Text>
	}

	const setCategory = (id: string) => {
		if (activeCategories.includes(id)) {
			const index = activeCategories.findIndex((x) => x === id)
			const arr = [...activeCategories]
			arr.splice(index, 1)
			setActiveCategories(arr)
		} else {
			setActiveCategories([...activeCategories, id])
		}
	}

	return (
		<SafeAreaView>
			<ScrollView style={{ padding: 5 }} showsVerticalScrollIndicator={false}>
				<Text style={{ fontSize: 32, paddingBottom: 15 }}>Магазин</Text>
				<ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
					<View
						style={{
							marginBottom: 15,
							display: 'flex',
							flexDirection: 'row',
							gap: 5
						}}
					>
						{categories.map((category) => {
							return (
								<Chip
									setCategory={() => setCategory(category.id)}
									active={activeCategories.includes(category.id)}
									title={category.title}
									key={category.id}
								/>
							)
						})}
					</View>
				</ScrollView>
				<ProductsCards ids={activeCategories} />
			</ScrollView>
		</SafeAreaView>
	)
}
