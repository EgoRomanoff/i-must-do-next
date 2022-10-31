import React from 'react'
import stl from './ViewForm.module.scss'
import StatusRadio from "../StatusRadio/StatusRadio"
import { useContext, useRef, useState } from "react"
import IMDButton from "../UI/IMDButton/IMDButton"
import TaskModal from "../TaskModal/TaskModal"
import { AppContext } from "../../context"

function ViewForm({ taskData }) {

	const { setSelectedTask, convertDate, editTask, deleteTask } = useContext(AppContext)
	const [modalState, setModalState] = useState({  // parameters of modal element
		isVisible: false,
		question: '',
		callback: undefined
	})
	const thisForm = useRef()          // reference on task form

	const confirmDelete = () => {      // accept removing task
		setModalState({            // set state of modal
			isVisible: true,
			question: 'Удалить задачу?',
			callback: deleteTask
		})
	}

	const closeForm = () => {
		setSelectedTask({                // set default data to selectedItem state (App)
			task: undefined,
			isEdited: false,
			isAdded: false
		})
	}

	return (
		<form className={`${ stl.inner } ${ stl.showed }`} ref={thisForm}>
			<header className={ stl.header }>
				<h4 className={ stl.title }>Просмотр задачи</h4>
				<IMDButton
					text='Закрыть'
					type='close'
					size='lg'
					onClick={ closeForm }
				/>
			</header>

			<StatusRadio
				data={ taskData.status }
				isEdited={ false }
			/>

			<span className={ stl.name }>{ taskData.name }</span>

			<span className={
				`${ stl.description } ${ !taskData.description && stl.empty }`
			}>
				{ taskData.description || 'Описания нет'}
			</span>

			<div className={ stl.datetime }>
				<span className={
					`${ stl.date } ${ !taskData.date && stl.empty }`
				}>
					{ taskData.date ? convertDate(taskData.date) : '--.--.----' }
				</span>

					<span className={
						`${ stl.time } ${ !taskData.time && stl.empty }`
					}>
					{ taskData.time || '--:--'}
				</span>
			</div>

			<div className={ stl.btns }>
				<IMDButton
					text='Редактировать'
					type='edit'
					size='lg'
					onClick={ () => editTask() }
				/>
				<IMDButton
					text='Удалить'
					type='delete'
					size='lg'
					onClick={ confirmDelete }
				/>
			</div>
			{
				modalState.isVisible ?
					<TaskModal
						isVisible={ modalState.isVisible }
						setModalState={ setModalState }
						text={ modalState.question }
						callback={ modalState.callback }
						size='lg'
					/> :
					null
			}
		</form>
	)
}

export default ViewForm