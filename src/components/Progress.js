/*
* @Author: maoying.hu
* @Date:   2018-08-12 16:52:52
* @Last Modified by:   maoying.hu
* @Last Modified time: 2018-08-12 18:48:16
*/

import React from 'react'

import style from './style/Progress.less'


class Progress extends React.Component {
	constructor(props) {
		super(props)

	}

	componentDidMount() {

	}

	render() {
		const { progress } = this.props
 		return (
			<div className={style.wrap}>
				{progress}
			</div>
		)
	}
}

export default Progress
