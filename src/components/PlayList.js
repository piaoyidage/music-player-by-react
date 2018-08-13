/*
* @Author: maoying.hu
* @Date:   2018-08-13 16:15:13
* @Last Modified by:   maoying.hu
* @Last Modified time: 2018-08-13 19:38:11
*/

import React from 'react'
import { Table, Divider } from 'antd'

import MusicList from '../static/config.js'


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
			<div>
				<Table dataSource={MusicList} columns={this.columns} />
			</div>
		)
	}
}


export default PlayList
