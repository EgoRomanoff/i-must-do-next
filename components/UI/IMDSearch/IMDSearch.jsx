import React from 'react'
import stl from './IMDSearch.module.scss'
import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../../context"

function IMDSearch({ setSearchData }) {

	const { selectedTask } = useContext(AppContext)
	const [inputValue, setInputValue] = useState('')
	const [isDisabled, setIsDisabled] = useState(false)

	useEffect(() => {
		setIsDisabled((selectedTask.isEdited || selectedTask.isAdded))
	}, [selectedTask])

	const onChangeHandler = e => {    // set input value to searchData state in Resizer
		setSearchData(prevState => {
			return {
				...prevState,
				value: e.target.value
			}
		})
		setInputValue(e.target.value)
	}

	return (
		<input
			className={ stl.input }
			type="search"
			placeholder="Найти задачу..."
			value={ inputValue }
			onChange={ onChangeHandler }
			disabled={ isDisabled }
		/>
	)
}

export default IMDSearch