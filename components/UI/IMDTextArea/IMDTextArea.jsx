import React from 'react'
import stl from './IMDTextArea.module.scss'
import {useEffect, useLayoutEffect, useRef, useState} from "react"

function IMDTextArea({ className, taskDataType, data, isRequired, placeholder, maxLength }) {

	const [value, setValue] = useState(String(data))
	const thisTextarea = useRef(null)
	const elemClasses = [stl.wrapper, className]

	useEffect(() => {
		setValue(data)
	}, [data])

	let height            // height is used in useLayoutEffect
	switch (taskDataType) {
		case 'name':
			height = 44
			break
		case 'description':
			height = 38
			break
		default:
			break
	}

	// change the maximum height of the textarea depending on the content inside
	useLayoutEffect(() => {
		thisTextarea.current.style.height = 'inherit'
		thisTextarea.current.style.height = `${Math.max(
			thisTextarea.current.scrollHeight,  // get maximum between content height and min height
			height
		)}px`
	}, [value])

	const onChangeHandler = e => {
		setValue(e.target.value)
	}

	return (
		<div className={ elemClasses.join(' ') }>
			<textarea
				className={ stl.input }
				ref={ thisTextarea }
				value={ value }
				onChange={ onChangeHandler }
				rows='1'
				placeholder={ placeholder }
				name={ taskDataType }
				required={ isRequired }
				maxLength={ maxLength }
			/>
		</div>
	)
}

export default IMDTextArea