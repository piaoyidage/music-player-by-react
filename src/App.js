import React, { Component } from 'react'
import $ from 'jquery'
import jPlayer from 'jplayer'
import { Route } from 'react-router-dom'
import PubSub from 'pubsub-js'

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

        this.state = {
            music: MusicList[2],
        }
    }

    componentDidMount() {
        const { volume } = config
        const { music } = this.state
        const { length } = MusicList
        // 初始化，并绑定时间的更新事件
        $("#player").jPlayer({
            supplied: 'mp3',
            vmode: 'window',
            volume: volume,
        })
        this.playMusic()
        PubSub.subscribe('NEXT', () => {
            const index = this.getMusicIndex()
            const nextIndx = (index + 1) % length
            this.setState({
                music: MusicList[nextIndx],
            })
            this.playMusic()
        })
        PubSub.subscribe('PREVIOUS', () => {
            const index = this.getMusicIndex()
            const previousIndex = (index - 1 + length) % length
            this.setState({
                music: MusicList[previousIndex],
            })
            this.playMusic()
        })
        PubSub.subscribe('PLAY', (msg, music) => {
            const index = MusicList.findIndex(i => i === music)
            this.setState({
                music: MusicList[index],
            })
            this.playMusic()
        })
    }

    componentWillUnMount() {
        PubSub.unsubscribe('NEXT')
        PubSub.unsubscribe('PREVIOUS')
        PubSub.unsubscribe('PLAY')
    }

    getMusicIndex = () => MusicList.findIndex(i => i === this.state.music)

    playMusic = () => {
        $("#player").jPlayer("setMedia", {
            mp3: this.state.music.url,
        }).jPlayer('play')
    }

    render() {
        return (
            <div className={style.wrap}>
                <Header />
                <div id="player"></div>
                <Route path='/' exact render={props => <Player {...props} {...this.state} />} />
                <Route path='/music-list' render={props => <PlayList {...props} {...this.state} />} />
            </div>
        )
    }
}

export default App
