# music-player-by-react
音乐播放器

## 项目搭建

使用 create-react-app 创建项目，执行命令 `yarn run eject` 使内置的配置文件暴露出来，方便自定义。

1. 配置 LESS
2. 配置 CSS Modules
3. 配置 antd
4. 配置 react-router

## 项目开发

### 音乐

使用 jPlayer 插件

```bash
yarn add jquery jPlayer
```

### 计算进度条

![进度条](./images/progress.png)

百分比计算：

```js
const percent = (e.clientX - node.getBoundingClientRect().left) / node.clientWidth;
```

### 格式化时间

格式化时间是一个常见的需求，使用 moment 库可以方便快捷进行格式化。例如将 100s 格式化成 mm:ss:

```js
const time = moment.utc(100 * 1000).format('mm:ss');
```

### react-router v4

父组件向子组件传参

```jsx
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
```

### PubSubJS

使用 PubSubJS 发布订阅实现组件间的通信。


## 参考

1. [Adding SASS or LESS support to create-react-app](https://medium.com/nulogy/how-to-use-css-modules-with-create-react-app-9e44bec2b5c2)
2. [How to Use CSS Modules with Create React App](https://medium.com/nulogy/how-to-use-css-modules-with-create-react-app-9e44bec2b5c2)