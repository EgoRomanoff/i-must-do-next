import React from 'react'
import stl from './TaskModal.module.scss'
import IMDButton from "../UI/IMDButton/IMDButton"
import {Fragment, useRef} from "react"

function TaskModal({ isVisible, setModalState, text, callback, size }) {

	const thisModal = useRef(null) // link to current modal
	const elemClasses = [stl.wrapper, size === 'lg' ? stl.modalLG : stl.modalSM]

	if (isVisible === true) {
		setTimeout(() => {
			thisModal.current.classList.add( stl.showed )
			document.addEventListener('click', isModalClickHandler)
		}, 0)
	}

	const closeModal = () => {
		thisModal.current.classList.remove( stl.showed )
		document.removeEventListener('click', isModalClickHandler)  // and remove click listener

		setTimeout(() => {
			setModalState({              // set modalState to default values
				isVisible: false,
				question: null,
				callback: null
			})
		}, 200)
	}

	const isModalClickHandler = e => {          // handler for checking clicks outside the modal
		!thisModal.current.contains(e.target) && closeModal()
	}

	return (
		<Fragment>
			<div
				className={elemClasses.join(' ')}
				ref={ thisModal }>
			<span className={ stl.text }>
				{ text }
			</span>
				<div className={ stl.btns }>
					<IMDButton
						text='Да'
						type='enter'
						size='sm'
						onClick={ () => {
							callback()
							closeModal()
						} }
					/>
					<IMDButton
						text='Нет'
						type='cancel'
						size='sm'
						onClick={ closeModal }
					/>
				</div>
			</div>
			{
				size === 'lg' ?
					<div className={ stl.overlay }></div> :
					null
			}
		</Fragment>
	)
}

export default TaskModal