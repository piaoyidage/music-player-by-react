import React, { Component } from 'react'

import Header from './components/Header'

import style from './App.less'

class App extends Component {
    render() {
        return (
            <div className={style.wrap}>
                <Header />
            </div>
        )
    }
}

export default App
