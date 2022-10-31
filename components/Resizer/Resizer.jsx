import React from 'react'
import { useEffect } from 'react'

function Resizer({ className, resizableElem }) {

	let startPosition, tasksWidth

	// creating an element for changing drag effect picture
  useEffect(() => {
    const dragImg = document.createElement('canvas');
    dragImg.classList.add('drag-img')
  }, [])

	// get coordinates and width values at the start of resizing
	const startResize = e => {
		e.stopPropagation()
		startPosition = e.clientX // X of resizer element
		tasksWidth = resizableElem.current.offsetWidth // current width of Resizer element
		e.dataTransfer.setDragImage(dragImg, 0, 0) // set drag image
		e.target.style.cursor = 'col-resize'
	}

	// change width when border is moving
	const resize = e => {
		resizableElem.current.style.width = `${tasksWidth + e.clientX - startPosition}px`
	}

	return (
    <div
	    className={ className }
      draggable={ true }
      onDragStart={ startResize }
      onDrag={ resize }
    />
	)
}

export default Resizer