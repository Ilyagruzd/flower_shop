import React from 'react'
import { View } from 'react-native'
import { Navigator } from '@/navigations/Navigator'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<SafeAreaProvider>
				<View style={{ height: '100%' }}>
					<Navigator />
				</View>
			</SafeAreaProvider>
		</QueryClientProvider>
	)
}
