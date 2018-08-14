/*
* @Author: maoying.hu
* @Date:   2018-08-13 16:15:13
* @Last Modified by:   maoying.hu
* @Last Modified time: 2018-08-14 14:42:53
*/

import React from 'react'
import { Table, Divider } from 'antd'

import MusicList from '../static/config.js'
import style from './style/PlayList.less'


class PlayList extends React.Component {
	constructor(props) {
		super(props)
		this.columns = [
			{
				title: '音乐标题',
				dataIndex: 'name',
			},
			{
				title: '歌手',
				dataIndex: 'singer',
			},
			{
				title: '时长',
				dataIndex: 'duration',
				render: () => 2,
			},
			{
				title: '操作',
				render: (text, record) => (
				    <span>
						<a href="javascript:;">Download</a>
						<Divider type="vertical" />
						<a href="javascript:;">Delete</a>
				    </span>
				),
			}
		]

	}

	componentDidMount() {

	}

	render() {
		return (
			<div className={style.wrap}>
				<Table
					dataSource={MusicList}
					columns={this.columns}
					pagination={false}
				/>
				<div className={style['music-repo']}>
            		<a href='/'>返回播放页面</a>
            	</div>
			</div>
		)
	}
}


export default PlayList
