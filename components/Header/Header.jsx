import React from 'react'
import stl from './Header.module.scss'
import logo from '../../public/img/logo.svg'
import IMDSearch from "../UI/IMDSearch/IMDSearch"
import IMDButton from "../UI/IMDButton/IMDButton"
import Link from 'next/link'

function Header({ setSearchData, addTaskCallback }) {

	return (
		<div className={ stl.wrapper }>
			<svg className={ stl.logo }>
				<use href={`${ logo }#logo`}/>
			</svg>
			<IMDButton
				text="Создать"
				type="add"
				size="lg"
				onClick={ addTaskCallback }
			/>
      <Link href="/usage">Ссылка</Link>
			<IMDSearch
				setSearchData={ setSearchData }/>
		</div>
	)
}

export default Header