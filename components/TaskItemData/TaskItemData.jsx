import React from 'react'
import stl from './TaskItemData.module.scss'
import Icons from "../Icons/Icons"

function TaskItemData({ className, type, data }) {

	return (
		<div className={`${ stl.wrapper } ${ className }`}>
			<Icons
				className={ stl.taskDataIcon }
				name={ type }
				size='14'
			/>
			<span className={ stl.taskDataValue}>{ data }</span>
		</div>
	)
}

export default TaskItemData;