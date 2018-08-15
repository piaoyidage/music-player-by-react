/*
* @Author: maoying.hu
* @Date:   2018-08-13 16:15:13
* @Last Modified by:   maoying.hu
* @Last Modified time: 2018-08-15 16:36:06
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
				key: 'name',
				title: '音乐标题',
				dataIndex: 'name',
			},
			{
				key: 'singer',
				title: '歌手',
				dataIndex: 'singer',
			},
			{
				key: 'duration',
				title: '时长',
				dataIndex: 'duration',
			},
			{
				key: 'action',
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
				window.location.href = music.url
				break
			case 'delete':
				// 模拟删除
				MusicList.splice(MusicList.findIndex(i => i === music), 1)
				this.setState({})
				break
			default:
				break
		}
	}


	render() {
        const prefix = process.env.PUBLIC_URL
		return (
			<div className={style.wrap}>
				<Table
					rowKey="name"
					dataSource={MusicList}
					columns={this.columns}
					pagination={false}
					rowClassName={(record, index) => {
						const currentIndex = MusicList.findIndex(i => i === this.props.music)
						if (index === currentIndex) {
							return style.current
						}
						return style.odd
						// return index % 2  === 0 ? style.odd : style.even
					}}
				/>
				<div className={style['music-repo']}>
            		<Link to={`${prefix}/`}>返回播放页面</Link>
            	</div>
			</div>
		)
	}
}


export default PlayList
