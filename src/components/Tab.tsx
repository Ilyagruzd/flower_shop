import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FC } from 'react'

interface TabInterface {
	name: string
	component: () => JSX.Element
	icon: JSX.Element
	activeIcon: JSX.Element
	tab: unknown
}

export const Tab: FC<TabInterface> = ({
	name,
	component,
	icon,
	activeIcon
}) => {
	const Tab = 

	return (
		<Tab.Screen
			name={name}
			component={component}
			options={{
				tabBarIcon: ({ focused }) => {
					return focused ? activeIcon : icon
				}
			}}
		/>
	)
}
