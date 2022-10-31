import React from 'react'
import stl from './Footer.module.scss'
import { AppContext } from '../../context'
import { useContext } from "react"

function Footer() {

	const { tasks } = useContext(AppContext)

	const filterTasksByStatus = (status) => tasks.filter(task => task.status === status).length

	const tasksCounter = {
		total: tasks.length,
		waiting: filterTasksByStatus('waiting'),
		inProcess: filterTasksByStatus('inProcess'),
		complete: filterTasksByStatus('complete'),
	}

	return (
		<footer className={ stl.wrapper }>
			<span className={ stl.totalCounter }>Всего задач: { tasksCounter.total }</span>
			<span className={ stl.waitingCounter }>{ tasksCounter.waiting }</span>
			<span className={ stl.inProcessCounter }>{ tasksCounter.inProcess }</span>
			<span className={ stl.completeCounter }>{ tasksCounter.complete }</span>
		</footer>
	)
}

export default Footer