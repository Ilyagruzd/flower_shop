import { FC, PropsWithChildren } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export const SafeAreaView: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const insets = useSafeAreaInsets()

	return (
		<View
			style={{
				flex: 1,
				paddingTop: insets.top,
				paddingBottom: insets.bottom,
				paddingLeft: insets.left,
				paddingRight: insets.right
			}}
		>
			{children}
		</View>
	)
}
