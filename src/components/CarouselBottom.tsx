import React, { FC } from 'react'
import { Animated, Dimensions, View } from 'react-native'

interface CarouselBottomProps {
	imageList: string[]
	scrollX: Animated.Value
}

const CarouselBottom: FC<CarouselBottomProps> = ({ imageList, scrollX }) => {
	const width = Dimensions.get('window').width
	const position = Animated.divide(scrollX, width)

	return (
		<View
			style={{
				width: '100%',
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'center',
				position: 'absolute',
				bottom: 5
			}}
		>
			{imageList.map((data, index) => {
				const opacity = position.interpolate({
					inputRange: [index - 1, index, index + 1],
					outputRange: [0.2, 1, 0.2],
					extrapolate: 'clamp'
				})
				return (
					<Animated.View
						key={index}
						style={{
							width: '20%',
							height: 2.6,
							backgroundColor: 'black',
							opacity,
							marginHorizontal: 4,
							borderRadius: 100
						}}
					/>
				)
			})}
		</View>
	)
}

export default CarouselBottom
