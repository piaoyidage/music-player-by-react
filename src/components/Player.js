/*
* @Author: maoying.hu
* @Date:   2018-08-12 21:54:05
* @Last Modified by:   maoying.hu
* @Last Modified time: 2018-08-13 14:45:46
*/

import React from 'react'
import $ from 'jquery'
import jPlayer from 'jplayer'
import moment from 'moment'

import Progress from './Progress'

import style from './style/Player.less'
import iconPlay from '../static/images/play.png'
import iconPause from '../static/images/pause.png'
import iconPrevious from '../static/images/previous.png'
import iconNext from '../static/images/next.png'
import iconVolume from '../static/images/volume.jpg'

let duration = 0

// 格式化时间，将秒转换为 mm:ss 格式
function format(second) {
	return moment.utc(second * 1000).format('mm:ss')
}

class Player extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
            progress: 0,
            volume: props.volume,
            isPlay: true,
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

    // 改变播放进度条
    handleChangeProgress = percent => {
        $("#player").jPlayer('play', duration * percent)
    }

    // 改变音量大小
    handleChangeVolume = percent => {
        $("#player").jPlayer('volume', percent)
        this.setState({
        	volume: percent,
        })
    }

    // 控制播放、暂停、上一首、下一首
    handleControl = e => {
    	const { action } = e.target.dataset
    	const { isPlay } = this.state
    	switch(action) {
    		case 'play':
        		$("#player").jPlayer('play')
        		this.setState({
        			isPlay: !isPlay,
        		})
    			break
    		case 'pause':
        		$("#player").jPlayer('pause')
        		this.setState({
        			isPlay: !isPlay,
        		})
        		break
        	default:
        		break
    	}
    }

    render() {
        const { progress, volume, isPlay } = this.state
        const { music: { name, author } } = this.props
        const playJsx = isPlay ?  <img src={iconPlay} alt="播放" data-action="play" /> : <img src={iconPause} alt="暂停" data-action="pause" />
        return (
            <div className={style.wrap}>


            	<div className={style.desc}>
            		<div>
            			<span className={style['music-name']}>{name}</span>
            			<span className={style['music-author']}>{author}</span>
            		</div>
            	</div>
            	<div className={style.ctx}>

            		<div className={style.progress}>
                		<Progress progress={progress} handleChangeProgress={this.handleChangeProgress} width={600} />
                		<span className={style.time}>
                			<span>{format(progress / 100 * duration)}</span>
                			/
                			<span>{format(duration)}</span>
            			</span>
            		</div>

            		<div className={style.volume}>
            			<img src={iconVolume} alt="音量" />
                		<Progress progress={volume * 100} handleChangeProgress={this.handleChangeVolume} width={100} />
            		</div>
            	</div>

            	<div className={style.control} onClick={this.handleControl}>
            		<img src={iconPrevious} alt="上一首" data-action="previous" />
            		{playJsx}
            		<img src={iconNext} alt="下一首" data-action="next" />
            	</div>

            </div>
        )
    }
}

export default Player
