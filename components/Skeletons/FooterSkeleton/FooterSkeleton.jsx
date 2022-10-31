import React from 'react'
import stl from './FooterSkeleton.module.scss'
// import '../SkeletonsCommon.scss'

function FooterSkeleton() {

	return (
		<footer className={ stl.wrapper }>
			<div className={`${ stl.totalCounter } skeleton__item`}></div>
			<div className={`${ stl.taskCounter }`}>
				<div className={`${ stl.ellipse } skeleton__ellipse`}></div>
				<div className={`${ stl.item } skeleton__item`}></div>
			</div>
			<div className={`${ stl.taskCounter }`}>
				<div className={`${ stl.ellipse } skeleton__ellipse`}></div>
				<div className={`${ stl.item } skeleton__item`}></div>
			</div>
			<div className={`${ stl.taskCounter }`}>
				<div className={`${ stl.ellipse } skeleton__ellipse`}></div>
				<div className={`${ stl.item } skeleton__item`}></div>
			</div>
		</footer>
	)
}

export default FooterSkeleton