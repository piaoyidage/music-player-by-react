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


class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            music: MusicList[0],
            isPlay: false,
            circle: 1,
            volume: 0.6,
        }
    }

    componentDidMount() {
        const { volume } = this.state
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
                isPlay: true,
            }, () => this.playMusic())
        })
        PubSub.subscribe('CIRCLE', (msg, circle) => {
            this.setState({
                circle: circle,
            })
        })
        PubSub.subscribe('NEXT_CIRCLE', (msg, music) => {
            const { circle } = this.state
            const index = MusicList.findIndex(i => i === music)
            const nextIndx = (index + 1) % length
            switch(circle) {
                case 0:
                    // 单曲循环
                    this.setState({
                        music: MusicList[index],
                    })
                    break
                case 1:
                    // 全部循环
                    this.setState({
                        music: MusicList[nextIndx],
                    })
                    break
                case 2:
                    // 随机播放
                    this.setState({
                        music: MusicList[Math.floor(Math.random() * length)]
                    })
                    break
                default:
                    break
            }
            this.playMusic()
        })
        PubSub.subscribe('PAUSE', () => {
            $("#player").jPlayer('pause')
            this.setState({
                isPlay: false,
            })
        })
        PubSub.subscribe('PLAY_CURRENT', () => {
            $("#player").jPlayer('play')
            this.setState({
                isPlay: true,
            })
        })

    }

    componentWillUnMount() {
        PubSub.unsubscribe('NEXT')
        PubSub.unsubscribe('PREVIOUS')
        PubSub.unsubscribe('PLAY')
        PubSub.unsubscribe('CIRCLE')
        PubSub.unsubscribe('PAUSE')
        PubSub.unsubscribe('PLAY_CURRENT')
    }

    getMusicIndex = () => MusicList.findIndex(i => i === this.state.music)

    playMusic = () => {
        const playState = this.state.isPlay ? 'play' : 'pause'
        $("#player").jPlayer("setMedia", {
            mp3: this.state.music.url,
        }).jPlayer(playState)
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
