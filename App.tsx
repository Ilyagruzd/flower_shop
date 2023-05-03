import React, { createContext } from 'react'
import { View } from 'react-native'
import { Navigator } from '@/navigations/Navigator'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { QueryClient, QueryClientProvider } from 'react-query'
import { User } from 'firebase/auth'
import { useAuthentication } from '@/utils/useAuthentication'
import { CartContextInterface, useCart } from '@/utils/useCart'
import { RootSiblingParent } from 'react-native-root-siblings'

const queryClient = new QueryClient()
export const UserContext = createContext<User | undefined>(undefined)
export const CartContext = createContext<CartContextInterface | undefined>(
	undefined
)

export default function App() {
	const { user } = useAuthentication()
	const cart = useCart(user)

	return (
		<QueryClientProvider client={queryClient}>
			<UserContext.Provider value={user}>
				<CartContext.Provider value={cart}>
					<SafeAreaProvider>
						<RootSiblingParent>
							<View style={{ height: '100%' }}>
								<Navigator />
							</View>
						</RootSiblingParent>
					</SafeAreaProvider>
				</CartContext.Provider>
			</UserContext.Provider>
		</QueryClientProvider>
	)
}
