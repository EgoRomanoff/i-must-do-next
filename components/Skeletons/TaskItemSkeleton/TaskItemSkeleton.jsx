import React from 'react'
import stl from './TaskItemSkeleton.module.scss'
// import '../SkeletonsCommon.scss'

function TaskItemSkeleton() {
	return (
		<li
			className={`${ stl.item } skeleton__ellipse`}
		>
			<div className={`${ stl.name } skeleton__item`}></div>
			<div className={`${ stl.description } skeleton__item`}></div>
			<div className={`${ stl.datetime } skeleton__item`}></div>
		</li>
	)
}

export default TaskItemSkeleton