import React from 'react'
import stl from './TaskList.module.scss'
import TaskItem from "../TaskItem/TaskItem"
import { useContext } from "react"
import { AppContext } from '../../context'

function TaskList({ searchResults }) {

	const { tasks } = useContext(AppContext)

	const renderTaskList = () => {                     // render task items of task list
		let dataSource = searchResults || tasks          // choose data source
		if (dataSource.length) {                         // if data source is not empty
			return dataSource.map(task => {                // return new array with React Components
				return (
					<TaskItem key={ task.id } task={ task }/>
				)
			})
		} else {                                         // else return an empty screen
			return <span className={ stl.empty }>Задач нет</span>
		}
	}

	return (
		<ul className={ stl.wrapper }>
			{ renderTaskList() }
		</ul>
	)
}

export default TaskList