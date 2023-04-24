import React, { FC, useCallback } from 'react'
import {
	Animated,
	FlatList,
	TouchableOpacity,
	View,
	Image,
	Dimensions
} from 'react-native'
import { Entypo } from '@expo/vector-icons'
import CarouselBottom from './CarouselBottom'
import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface Carousel {
	imageList: string[]
}

const Carousel: FC<Carousel> = ({ imageList }) => {
	const navigation = useNavigation()
	const width = Dimensions.get('window').width
	const insets = useSafeAreaInsets()
	const scrollX = new Animated.Value(0)

	const handleGoBack = useCallback(() => {
		navigation.goBack()
	}, [])

	const renderProduct = ({ item, index }: { item: string; index: number }) => {
		return (
			<View
				style={{
					width: width,
					height: width,
					alignItems: 'center',
					justifyContent: 'center'
				}}
			>
				<Image
					source={{ uri: item }}
					style={{
						width: '100%',
						height: '100%',
						resizeMode: 'contain'
					}}
				/>
			</View>
		)
	}

	return (
		<View>
			<FlatList
				style={{ position: 'relative' }}
				data={imageList}
				horizontal
				renderItem={renderProduct}
				showsHorizontalScrollIndicator={false}
				decelerationRate={0.8}
				snapToInterval={width}
				bounces={false}
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { x: scrollX } } }],
					{ useNativeDriver: false }
				)}
			/>
			<TouchableOpacity
				style={{
					position: 'absolute',
					backgroundColor: 'white',
					borderRadius: 10,
					opacity: 0.8,
					top: insets.top + 20,
					left: 25
				}}
			>
				<Entypo
					name='chevron-left'
					size={36}
					color='black'
					onPress={handleGoBack}
				/>
			</TouchableOpacity>
			<CarouselBottom scrollX={scrollX} imageList={imageList} />
		</View>
	)
}

export default Carousel
