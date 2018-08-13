import React, { Component } from 'react'
import $ from 'jquery'
import jPlayer from 'jplayer'

import Header from './components/Header'
import Player from './components/Player'
import PlayList from './components/PlayList'

import style from './App.less'
import MusicList from './static/config'

const config = {
    volume: 0.1,
}

class App extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const { volume } = config
        // 初始化，并绑定时间的更新事件
        $("#player").jPlayer({
            ready(){
                $(this).jPlayer("setMedia", {
                    mp3: MusicList[3].url,
                }).jPlayer('play')
            },
            supplied: 'mp3',
            vmode: 'window',
            volume: volume,
        })
    }

    render() {
        return (
            <div className={style.wrap}>
                <Header />
                <div id="player"></div>
                <Player music={MusicList[3]} volume={config.volume} />
                <PlayList />
            </div>
        )
    }
}

export default App
