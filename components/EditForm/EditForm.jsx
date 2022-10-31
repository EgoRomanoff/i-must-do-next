import React from 'react'
import stl from './EditForm.module.scss'
import IMDTextArea from "../UI/IMDTextArea/IMDTextArea"
import StatusRadio from "../StatusRadio/StatusRadio"
import IMDInput from "../UI/IMDInput/IMDInput"
import { useContext, useRef } from "react"
import IMDButton from "../UI/IMDButton/IMDButton"
import { AppContext } from "../../context"

function EditForm({ taskData, setTasks }) {

	const { selectedTask, setSelectedTask } = useContext(AppContext)

	const thisForm = useRef()            // reference on task form

	const cancelEditing = () => {        // cancel task editing process

		if (selectedTask.isAdded) {        // if new task is added
			setSelectedTask({                // set default data to selectedItem state (App)
				task: undefined,
				isEdited: false,
				isAdded: false
			})                               // and finish process
		} else {
			setSelectedTask({                // else finish editing process
				task: selectedTask.task,       // with previous selected task data
				isEdited: false,
				isAdded: false
			})
		}
	}

	const confirmEditing = () => {                     // accept changes in edited task
		const formElements = thisForm.current.elements   // get collection of all task form's children
		const creatingTaskData = {                       // collect necessary values in object
			id: selectedTask.task.id,
			name: formElements.name.value,
			description: formElements.description.value,
			date: formElements.date.value,
			time: formElements.time.value,
			status: formElements.status.value
		}
		console.log(formElements.name.value)
		if (!formElements.name.value) {                                 // if task name is empty
			formElements.name.parentNode.classList.add( stl.invalid )      // show error style
			setTimeout(() => {
				formElements.name.parentNode.classList.remove( stl.invalid ) // for 3 seconds
			}, 3000)
			return false
		}

		if (selectedTask.isAdded) {                      // if new task is adding
			setTasks(prevState => {                        // set created task to tasks state (App)
				return [...prevState, creatingTaskData]
			})
		} else {
			setTasks(prevState => {                        // set edited task to tasks state (App)
				return prevState.map(task => {               // loop over the tasks
					return task.id === selectedTask.task.id ?  // find the edited task
						{...creatingTaskData} :                  // and update data
						task                                     // else returns unmodified item
				})
			})
		}

		setSelectedTask({
			task: {...creatingTaskData},                   // set edited data to selectedTask state
			isEdited: false,                               // and finish editing
			isAdded: false
		})
	}

	return (
		<form className={ `${stl.inner} ${stl.showed}`} ref={ thisForm }>
			<header className={ stl.header }>
				<h4 className={ stl.title }>
					{ selectedTask.isAdded ? 'Создание новой задачи' : 'Редактирование задачи'}
				</h4>

				<IMDButton
					text='Отмена'
					type='cancel'
					size='lg'
					onClick={ cancelEditing }
				/>
			</header>

			<StatusRadio
				data={ taskData.status }
				isEdited={ !selectedTask.isAdded }
			/>

			<IMDTextArea
				className={ stl.name }
				taskDataType='name'
				data={ taskData.name }
				isRequired={ true }
				placeholder='Введите название задачи...'
				maxLength='100'
			/>

			<IMDTextArea
				className={ stl.description }
				taskDataType='description'
				data={ taskData.description || '' }
				isRequired={ false }
				placeholder='Описания нет'
				maxLength='500'
			/>

			<div className={ stl.datetime }>
				<IMDInput
					taskDataType='date'
					data={ taskData.date || '' }
				/>
				<IMDInput
					taskDataType='time'
					data={ taskData.time || '' }
				/>
			</div>

			<div className={ stl.btns }>
				<IMDButton
					text='Сохранить'
					type='save'
					size='lg'
					onClick={ confirmEditing }
				/>
			</div>
		</form>
	)
}

export default EditForm