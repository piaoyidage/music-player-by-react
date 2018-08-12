import React, { Component } from 'react'
import $ from 'jquery'
import jPlayer from 'jplayer'

import Header from './components/Header'
import Progress from './components/Progress'

import style from './App.less'
import mp3Demo from './static/music/魔鬼中的天使.mp3'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            progress: '-',
        }
    }

    componentDidMount() {
        // 初始化，并绑定时间的更新事件
        $("#player")
        .jPlayer({
            ready(){
                $(this).jPlayer("setMedia", {
                    mp3: mp3Demo,
                }).jPlayer('play')
            },
            supplied: 'mp3',
            vmode: 'window',
        })
        .bind($.jPlayer.event.timeupdate, e => {
            this.setState({
                progress: e.jPlayer.status.currentPercentAbsolute,
            })
        })
    }

    componentWillUnmount() {
        // 卸载事件绑定
        $("#player").unbind($.jPlayer.event.timeupdate)
    }

    render() {
        const { progress } = this.state
        return (
            <div className={style.wrap}>
                <Header />
                <div id="player"></div>
                <Progress progress={progress} />
            </div>
        )
    }
}

export default App
