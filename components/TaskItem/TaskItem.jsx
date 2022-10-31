import React from 'react'
import stl from './TaskItem.module.scss'
import IMDButton from "../UI/IMDButton/IMDButton"
import TaskModal from "../TaskModal/TaskModal"
import {useContext, useState} from "react"
import TaskItemData from "../TaskItemData/TaskItemData"
import { AppContext } from '../../context'

function TaskItem({ task }) {

	const { selectedTask, setSelectedTask, convertDate, changeStatus, deleteTask, editTask } = useContext(AppContext)

	let elemClasses = [stl.wrapper] // get necessary CSS-classes and set in array

	switch (task.status) { // check task status and add necessary CSS-class
		case 'waiting':
			elemClasses.push(stl.taskWaiting)
			break
		case 'inProcess':
			elemClasses.push(stl.taskInProcess)
			break
		case 'complete':
			elemClasses.push(stl.taskComplete)
			break
		default:
			break
	}

	const [modalState, setModalState] = useState({ // state of modal window
		isVisible: false,      // visibility
		question: null,        // dialog question
		callback: null         // function on enter btn
	})

	const showModal = btnType => {   // open modal and set parameters
		let question, callback

		switch (btnType) {             // read 'btnType' and set necessary question and callback
			case 'complete':
				[question, callback] = ['Пометить задачу выполненной?', () => changeStatus(task.id, 'complete')]
				break
			case 'inProcess':
				[question, callback] = ['Начать выполнение задачи?', () => changeStatus(task.id, 'inProcess')]
				break
			case 'delete':
				[question, callback] = ['Удалить задачу?', () => deleteTask(task.id)]
				break
			default:
				break
		}

		setModalState({         // set new state
			isVisible: true,
			question: question,
			callback: callback
		})
	}

	if (selectedTask.task) {                    // if selected task is present
		if (selectedTask.task.id === task.id) {  // and selected task and current task are equal
			elemClasses.push( stl.selected )       // add CSS-class '.selected" to the item
		} else if (                              // if another task is edited or new task is added
			selectedTask.task.id !== task.id &&
			(selectedTask.isEdited || selectedTask.isAdded)
		) {
			elemClasses.push( stl.unavailable )    // add CSS-class '.unavailable" to the item
		}
	}

	const selectTask = () => {  // callback for setting selected task
		if (!(selectedTask.isEdited || selectedTask.isAdded)) {
			setSelectedTask({
				task: task,
				isEdited: false,
				isAdded: false
			})
		}
	}

	return (
		<li
			className={ elemClasses.join(' ') } // Turn array into string and set CSS-classes
			id={ task.id }
		>
			<div className={ stl.inner } onClick={ selectTask }>
				<span className={ stl.name }>{ task.name }</span>
				{ // check description presence
					task.description ?
						<TaskItemData
							className={ stl.description }
							type='description'
							data={ task.description }
						/> :
						null
				}
				{ // check date AND time presence
					(task.date !== null || task.time !== null) ?
						<div className={ stl.datetime }>
							{ // check date presence
								task.date ?
									<TaskItemData
										className={ stl.date }
										type='date'
										data={ convertDate(task.date) }
									/> :
									null
							}
							{ // check time presence
								task.time ?
									<TaskItemData
										className={ stl.time }
										type='time'
										data={ task.time }
									/> :
									null
							}
						</div> :
						null
				}
			</div>

			<div className={ stl.btns }>

				<IMDButton
					type='inProcess'
					size='sm'
					onClick={ () => showModal('inProcess') }
				/>

				<IMDButton
					type='complete'
					size='sm'
					onClick={ () => showModal('complete') }
				/>

				<IMDButton
					type='edit'
					size='sm'
					onClick={ () => editTask(task.id) }
				/>

				<IMDButton
					type='delete'
					size='sm'
					onClick={ () => showModal('delete') }
				/>

			</div>

			{
				modalState.isVisible ?
					<TaskModal
						isVisible={ modalState.isVisible }
						setModalState={ setModalState }
						text={ modalState.question }
						callback={ modalState.callback }
						size='sm'
					/> :
					null
			}
		</li>
	)
}

export default TaskItem