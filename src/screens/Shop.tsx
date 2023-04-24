import React from 'react'
import {
	StackNavigationProp,
	createStackNavigator
} from '@react-navigation/stack'
import { ProductCatalog } from './Shop/ProductCatalog'
import { ProductInfo } from './Shop/ProductInfo'

export type StackParamList = {
	ProductCatalog: undefined
	ProductInfo: { productId: string }
}

export type NavigationProps = StackNavigationProp<StackParamList>

export const Shop = () => {
	const Stack = createStackNavigator()

	return (
		<Stack.Navigator
			initialRouteName='ProductCatalog'
			screenOptions={{ headerShown: false }}
		>
			<Stack.Screen name='ProductInfo' component={ProductInfo} />
			<Stack.Screen name='ProductCatalog' component={ProductCatalog} />
		</Stack.Navigator>
	)
}
