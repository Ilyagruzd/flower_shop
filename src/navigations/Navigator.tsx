import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { TabsBottom } from './tabs/TabsBottom'

export const Navigator = () => {
	return (
		<NavigationContainer>
			<TabsBottom />
		</NavigationContainer>
	)
}
