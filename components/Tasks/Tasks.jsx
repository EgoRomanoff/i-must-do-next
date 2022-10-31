import React from 'react'
import stl from './Tasks.module.scss'
import Header from "../Header/Header"
import TaskList from "../TaskList/TaskList"
import Footer from "../Footer/Footer"
import TaskListSkeleton from "../Skeletons/TaskListSkeleton/TaskListSkeleton"
import FooterSkeleton from "../Skeletons/FooterSkeleton/FooterSkeleton"
import { useContext, useEffect, useRef, useState } from "react"
import { AppContext } from '../../context'
import Resizer from "../Resizer/Resizer"

function Tasks({ isLoading, addTaskCallback }) {

	const { tasks } = useContext(AppContext)
	const thisTasksElem = useRef() // ref on this element (use in function fo resizing)
	const [searchData, setSearchData] = useState({  // state for searching (value and results)
		value: '',
		results: undefined
	})

	// using hook useEffect for searching tasks by name
	useEffect(() => {
		if (searchData.value === '') {                  // if search input value is empty string
			setSearchData(prevState => {            // set results to undefined
				return {...prevState, results: undefined}
			})
		} else {
			const results = tasks.filter(task =>          // filter tasks context by any matches with search value
				task.name.toLowerCase().includes(searchData.value.toLowerCase())
			)
			setSearchData(prevState => {            // set collection of matched tasks to results state
				return {...prevState, results: results}
			})
		}
	}, [searchData.value])

	return (
		<div className={ stl.wrapper } ref={ thisTasksElem }>
      <Resizer className={ stl.resizer } resizableElem={ thisTasksElem }/>
			<Header
				setSearchData={ setSearchData }
				addTaskCallback={ addTaskCallback }
			/>
			{
				isLoading ?
					<TaskListSkeleton/> :
					<TaskList searchResults={ searchData.results } />
			}
			{
				isLoading ?
					<FooterSkeleton/> :
					<Footer/>
			}
		</div>
	)
}

export default Tasks