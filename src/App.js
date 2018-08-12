import React, { Component } from 'react'
import $ from 'jquery'
import jPlayer from 'jplayer'

import Header from './components/Header'
import Player from './components/Player'

import style from './App.less'
import MusicList from './static/config'


class App extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        // 初始化，并绑定时间的更新事件
        $("#player").jPlayer({
            ready(){
                $(this).jPlayer("setMedia", {
                    mp3: MusicList[0].url,
                }).jPlayer('pause')
            },
            supplied: 'mp3',
            vmode: 'window',
        })
    }

    render() {
        return (
            <div className={style.wrap}>
                <Header />
                <div id="player"></div>
                <Player />
            </div>
        )
    }
}

export default App
