import React from 'react'
import stl from './TaskForm.module.scss'
import { useContext, useEffect, useRef, useState } from "react"
import TaskFormPreloader from "../TaskFormPreloader/TaskFormPreloader"
import { AppContext } from "../../context"
import EditForm from "../EditForm/EditForm";
import ViewForm from "../ViewForm/ViewForm";

function TaskForm({ isLoading, setTasks }) {

	const { selectedTask } = useContext(AppContext)
	const [taskData, setTaskData] = useState()  // data from selectedTask state (using for setting input values)
	const thisForm = useRef()                   // reference on task form

	useEffect(() => {
		setTaskData(selectedTask.task)
	}, [selectedTask])

	return (
		<div className={ stl.wrapper } ref={ thisForm }>
			{
				isLoading ?
					<TaskFormPreloader/> :
					taskData ?
						selectedTask.isEdited ?
							<EditForm taskData={ taskData } setTasks={ setTasks }/> :
							<ViewForm taskData={ taskData }/> :
						<div className={ stl.empty }>
							Выберите задачу<br/>
							или создайте новую
						</div>
			}
		</div>
	)
}

export default TaskForm