/*
* @Author: maoying.hu
* @Date:   2018-08-12 16:52:52
* @Last Modified by:   maoying.hu
* @Last Modified time: 2018-08-12 22:51:08
*/

import React from 'react'

import style from './style/Progress.less'


class Progress extends React.Component {
	constructor(props) {
		super(props)

	}

	handleChangeProgress = e => {
		const progress = this.refs.progress
		// 计算进度条位置
		const percent = (e.clientX - progress.getBoundingClientRect().left) / progress.clientWidth
		this.props.handleChangeProgress && this.props.handleChangeProgress(percent)
	}

	render() {
		const { progress, width } = this.props
 		return (
			<div className={style.wrap} ref="progress" onClick={this.handleChangeProgress} style={{ width: width }}>
				<div className={style.current} style={{ width: `${progress}%`}} />
			</div>
		)
	}
}

export default Progress
