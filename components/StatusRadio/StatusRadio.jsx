import React from 'react'
import stl from './StatusRadio.module.scss'
import {useEffect, useState} from "react"

function StatusRadio({ data, isEdited }) {

	const [status, setStatus] = useState('waiting')

	useEffect(() => {
		setStatus(data)
	}, [data])

	const checkingRadio = e => isEdited ?
			setStatus(e.target.value) :
			false

	return (
		<div className={ `${ stl.wrapper } ${ isEdited && stl.edited }` }>
			<div className={ `${ stl.input } ${ stl.waiting }` }>
				<input
					type="radio"
					name='status'
					value='waiting'
					id='radio-waiting'
					className={ stl.radio }
					checked={ status === 'waiting'}
					onChange={ checkingRadio }
				/>
				<label className={ stl.label } htmlFor='radio-waiting'>
					ожидает
				</label>
			</div>

			<div className={ `${ stl.input } ${ stl.inProcess }` }>
				<input
					type="radio"
					name='status'
					value='inProcess'
					id='radio-inProcess'
					className={ stl.radio }
					checked={ status === 'inProcess'}
					onChange={ checkingRadio }
				/>
				<label className={ stl.label } htmlFor='radio-inProcess'>
					в процессе
				</label>
			</div>

			<div className={ `${ stl.input } ${ stl.complete }` }>
				<input
					type="radio"
					name='status'
					value='complete'
					id='radio-complete'
					className={ stl.radio }
					checked={ status === 'complete'}
					onChange={ checkingRadio }
				/>
				<label className={ stl.label } htmlFor='radio-complete'>
					выполнено
				</label>
			</div>
		</div>
	)
}

export default StatusRadio