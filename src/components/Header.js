/*
* @Author: maoying.hu
* @Date:   2018-08-12 10:27:17
* @Last Modified by:   maoying.hu
* @Last Modified time: 2018-08-12 11:30:07
*/

import React from 'react'

import style from './style/Header.less'
import logo from '../static/images/music-logo.jpg'

function Header() {
	return (
		<div className={style.wrap}>
			<img className={style['music-logo']} src={logo} alt="music logo" />
			<div className={style['music-desc']}>Music Player</div>
		</div>
	)
}

export default Header
