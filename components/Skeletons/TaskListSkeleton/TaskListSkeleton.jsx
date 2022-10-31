import React from 'react'
import stl from './TaskListSkeleton.module.scss'
import TaskItemSkeleton from "../TaskItemSkeleton/TaskItemSkeleton";

function TaskListSkeleton() {

	let items = []
	const renderSkeletonItems = () => {
		for (let i = 1; i <= 10; i++) {
			items.push(<TaskItemSkeleton key={ i }/>)
		}
	}
	renderSkeletonItems()

	return (
		<ul className={ stl.wrapper }>
			{ items }
		</ul>
	)
}

export default TaskListSkeleton