/*
* @Author: maoying.hu
* @Date:   2018-08-13 16:15:13
* @Last Modified by:   maoying.hu
* @Last Modified time: 2018-08-14 20:28:12
*/

import React from 'react'
import { Table, Divider } from 'antd'
import { Link } from 'react-router-dom'
import PubSub from 'pubsub-js'

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
				render: music => {
				    return (
				    	<span onClick={this.handleClick.bind(this, music)}>
							<a href="javascript:;" data-action='play'>Play</a>
							<Divider type="vertical" />
							<a href="javascript:;" data-action='download'>Download</a>
							<Divider type="vertical" />
							<a href="javascript:;" data-action='delete'>Delete</a>
				    	</span>
			    	)
				},
			}
		]
	}

	componentDidMount() {

	}

	handleClick = (music, e) => {
		const { action } = e.target.dataset
		switch(action) {
			case 'play':
				PubSub.publish('PLAY', music)
				break
			case 'download':
				break
			case 'delete':
				break
			default:
				break
		}
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
            		<Link to='/'>返回播放页面</Link>
            	</div>
			</div>
		)
	}
}


export default PlayList
