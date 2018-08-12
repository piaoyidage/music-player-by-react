/*
* @Author: maoying.hu
* @Date:   2018-08-12 21:54:05
* @Last Modified by:   maoying.hu
* @Last Modified time: 2018-08-12 23:18:59
*/

import React from 'react'
import $ from 'jquery'
import jPlayer from 'jplayer'

import Progress from './Progress'

import style from './style/Player.less'
import iconPlay from '../static/images/play.jpg'
import iconPause from '../static/images/pause.jpg'
import iconPrevious from '../static/images/previous.jpg'
import iconNext from '../static/images/next.jpg'
import iconVolumn from '../static/images/volumn.jpg'

let duration = 0

class Player extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
            progress: 0,
        }
	}

	componentDidMount() {
        // 绑定时间的更新事件
        $("#player").bind($.jPlayer.event.timeupdate, e => {
            duration = e.jPlayer.status.duration
            this.setState({
                progress: e.jPlayer.status.currentPercentAbsolute,
            })
        })
    }

	componentWillUnmount() {
        // 卸载事件绑定
        $("#player").unbind($.jPlayer.event.timeupdate)
    }

    // 改变进度条
    handleChangeProgress = percent => {
        $("#player").jPlayer('play',duration * percent)
    }

    render() {
        const { progress } = this.state
        return (
            <div className={style.wrap}>
            	<div className={style.desc}>
            		<a href='#'>我的音乐库</a>
            		<h2>天使中的魔鬼</h2>
            		<span>田富裕</span>
            	</div>
            	<div className={style.ctx}>
            		<div className={style.control}>
            			<img src={iconPrevious} alt="上一首" />
            			<img src={iconPlay} alt="播放" />
            			<img src={iconNext} alt="下一首" />
            		</div>

            		<div className={style.progress}>
                		<Progress progress={progress} handleChangeProgress={this.handleChangeProgress} width={200} />
                		<span>1.2/3.4</span>
            		</div>

            		<div className={style.volumn}>
            			<img src={iconVolumn} alt="音量" />
                		<Progress progress={progress} handleChangeProgress={this.handleChangeProgress} width={100} />
            		</div>
            	</div>
            </div>
        )
    }
}

export default Player
