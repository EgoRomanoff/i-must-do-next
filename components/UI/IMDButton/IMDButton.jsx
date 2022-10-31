import React from 'react'
import stl from './IMDButton.module.scss'
import Icons from "../../Icons/Icons"
import {useContext, useEffect, useState} from "react"
import { AppContext } from "../../../context"

function IMDButton({ text = '', type, size, onClick }) {

	const { selectedTask } = useContext(AppContext)
	const [isDisabled, setIsDisabled] = useState(false)

	useEffect(() => {
		setIsDisabled((selectedTask.isEdited || selectedTask.isAdded))
	}, [selectedTask])

	let iconSize
	const elemClasses = [stl.btn] // get necessary CSS-classes and set in array

	// check size props
	// and set icon size and button size class
	switch (size) {
		case 'lg':
			iconSize = '14'
			elemClasses.push(stl.btnLg)
			break
		case 'sm':
			iconSize = '12'
			elemClasses.push(stl.btnSm)
			break
		default:
			iconSize = '14'
			break
	}

	// check type props
	// and set icon type and button type class
	switch (type) {
		case 'add':
			elemClasses.push(stl.btnAdd)
			break
		case 'complete':
			elemClasses.push(stl.btnComplete)
			break
		case 'edit':
			elemClasses.push(stl.btnEdit)
			break
		case 'inProcess':
			elemClasses.push(stl.btnInProcess)
			break
		case 'delete':
			elemClasses.push(stl.btnDelete)
			break
		case 'enter':
			elemClasses.push(stl.btnEnter)
			break
		case 'save':
			elemClasses.push(stl.btnSave)
			break
		case 'cancel':
			elemClasses.push(stl.btnCancel)
			break
		case 'close':
			elemClasses.push(stl.btnClose)
			break
		default:
			break
	}

	return (
		<button
			// Turn array into string and set CSS-classes
			className={ elemClasses.join(' ') }
			onClick={ onClick }
			type='button'
			disabled={ type === 'add' && isDisabled }
		>
			{text}
			{
				!((type === 'cancel' || type === 'enter') && size === 'sm') &&
				<Icons
					name={ type }
					size={ iconSize }
				/>
			}
		</button>
	)
}

export default IMDButton