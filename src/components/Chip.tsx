import React, { FC, useState } from 'react'
import { Chip as UiChip } from '@rneui/themed'

interface ChipProps {
	title: string
	active: boolean
	setCategory: () => void
}

const Chip: FC<ChipProps> = ({ title, setCategory, active }) => {
	return (
		<UiChip
			title={title}
			type={active ? 'solid' : 'outline'}
			buttonStyle={{ borderColor: 'black' }}
			titleStyle={{ color: 'black' }}
			onPress={() => setCategory()}
		/>
	)
}

export default Chip
