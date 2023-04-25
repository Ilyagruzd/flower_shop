import { SafeAreaView } from '@/components/SafeAreaView'
import React from 'react'
import { Text, View } from 'react-native'

export const CartWithoutUser = () => {
	return (
		<SafeAreaView>
			<View style={{ padding: 10 }}>
				<Text style={{ fontSize: 32, paddingBottom: 15 }}>Корзина</Text>
				<Text>Login pls</Text>
			</View>
		</SafeAreaView>
	)
}
