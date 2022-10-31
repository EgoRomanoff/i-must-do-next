import React from 'react'
import sprite from '../../public/img/sprite.svg'

function Icons({name, color = '#2D8D79', size = '16', className}) {

	return(
		<svg
			className={`${className} icon icon--${name}`}
			fill={color}
			width={size}
			height={size}
		>
			<use href={`${sprite}#icon--${name}`} />
		</svg>
	)
}

export default Icons;