import React from 'react'
import stl from './IMDInput.module.scss'
import {useEffect, useState} from "react"

function IMDInput({ taskDataType, data }) {

	const [value, setValue] = useState(String(data))

	useEffect(() => {
		setValue(data)
	}, [data])

	const today = new Date();                                      // get today date
	let dd = String(today.getDate())                               // for setting min value in date input
	let mm = String(today.getMonth() + 1).padStart(2, '0')
	let yyyy = today.getFullYear()
	const todayValue = `${yyyy}-${mm}-${dd}`

	const onChangeHandler = e => {
		setValue(e.target.value)
	}

	let inputType, maxValue, minValue
	switch (taskDataType) {
		case 'date':
			[inputType, minValue, maxValue] = ['date', todayValue, '2099-12-31']
			break
		case 'time':
			inputType= 'time'
			break
		default:
			break
	}

	return (
		<div className={ stl.wrapper }>
			<input
				className={ stl.input }
				type={ inputType }
				value={ value }
				onChange={ onChangeHandler }
				name={ taskDataType }
				min={ taskDataType === 'date' ? minValue : null }
				max={ taskDataType === 'time' ? maxValue : null }
			/>
		</div>
	)
}

export default IMDInput