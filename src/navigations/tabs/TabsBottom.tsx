import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { TabsEnum } from './tabs.enum'
import { Cart, Shop, AboutUs, Profile } from '@/screens/index'
import { Fontisto, AntDesign, Ionicons } from '@expo/vector-icons'

const iconChange = (icon: JSX.Element, activeIcon: JSX.Element) => {
	return {
		tabBarIcon: ({ focused }: { focused: boolean }) => {
			return focused ? activeIcon : icon
		},
		tabBarShowLabel: false
	}
}

export const TabsBottom = () => {
	const Tab = createBottomTabNavigator()

	return (
		<Tab.Navigator screenOptions={{ headerShown: false }}>
			<Tab.Screen
				name={TabsEnum.Shop}
				component={Shop}
				options={iconChange(
					<Fontisto name='shopping-store' size={24} color='gray' />,
					<Fontisto name='shopping-store' size={24} color='black' />
				)}
			/>
			<Tab.Screen
				name={TabsEnum.AboutUs}
				component={AboutUs}
				options={iconChange(
					<AntDesign name='contacts' size={24} color='gray' />,
					<AntDesign name='contacts' size={24} color='black' />
				)}
			/>
			<Tab.Screen
				name={TabsEnum.Profile}
				component={Profile}
				options={iconChange(
					<Ionicons name='flower-outline' size={24} color='gray' />,
					<Ionicons name='flower-outline' size={24} color='black' />
				)}
			/>
			<Tab.Screen
				name={TabsEnum.Cart}
				component={Cart}
				options={iconChange(
					<AntDesign name='shoppingcart' size={24} color='gray' />,
					<AntDesign name='shoppingcart' size={24} color='black' />
				)}
			/>
		</Tab.Navigator>
	)
}
