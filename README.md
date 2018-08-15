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


### 打包

使用 `yarn run build` 打包，然后执行 `git subtree push --prefix=build origin gh-pages`，将 build 文件夹下的内容推送到 gh-pages 分支时，出现如下问题：

```bash
error: RPC failed; curl 56 LibreSSL SSL_read: SSL_ERROR_SYSCALL, errno 54
fatal: The remote end hung up unexpectedly
fatal: The remote end hung up unexpectedly
Everything up-to-date
```

google 了下网上的解决方案，这些方案并没有解决我的问题。

换个方式，不将页面部署到 gh-pages 分支，将打包代码放到 master/docs 文件夹下，然后推送到远程仓库，这样也可以实现 gh-pages 的功能。

```bash
cp -r build/ docs
```


### react-router 问题

因为项目部署在 `http://piaoyidage.github.io/music-player-by-react/`，如果按照如下配置，部署后会匹配不到。

```jsx
return (
    <div className={style.wrap}>
        <Header />
        <div id="player"></div>
        <Route path={`/`} render={props => <Player {...props} {...this.state} />} />
        <Route path={`/music-list`} render={props => <PlayList {...props} {...this.state} />} />
    </div>
)
```

正确的方法是，根据不同环境配置：

```jsx
const prefix = process.env.PUBLIC_URL
return (
    <div className={style.wrap}>
        <Header />
        <div id="player"></div>
        <Route path={`${prefix}/`} render={props => <Player {...props} {...this.state} />} />
        <Route path={`${prefix}/music-list`} render={props => <PlayList {...props} {...this.state} />} />
    </div>
)
```

上面的这种解决方法也有问题，如果页面内部有跳转，每次都得取一次 `process.env.PUBLIC_URL`，换一种更好的解决方法，在 BrowserRouter 中加一个 basename:

```jsx
<BrowserRouter basename={process.env.PUBLIC_URL}>
	<App />
</BrowserRouter>
```

### 播放列表页刷新 404

解决方法是，将 BrowserRouter 改为 HashRouter，此时 basename 也不需要设置，需要明白 BrowserRouter 和 HashRouter 的不同。


### TODO

1. 继续优化
2. 添加歌词的支持


## 参考

1. [Adding SASS or LESS support to create-react-app](https://medium.com/nulogy/how-to-use-css-modules-with-create-react-app-9e44bec2b5c2)
2. [How to Use CSS Modules with Create React App](https://medium.com/nulogy/how-to-use-css-modules-with-create-react-app-9e44bec2b5c2)