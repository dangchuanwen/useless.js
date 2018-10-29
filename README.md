## useless.js（控制异步并发后对返回数据利用的顺序）
### 什么是useless.js ？
在网上无意间看到一道前端面试题，大体上就是一个按钮 A，一个按钮 B，点击按钮 A 和 按钮 B 会发送对应的请求并且将获得的数据渲染到前端，有时候用户点击频率过快，且请求的时间有可能受网络影响，导致数据的渲染顺序与点击按钮的顺序不一致，要求实现数据渲染的顺序与点击顺序一致。于是乎，我便想写一个控制异步并发后对返回数据的利用顺序，分离 请求数据 与 渲染数据。
### 安装
#### 目录结构

uselessJs  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;--- demo  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;---nodeServer  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;---webFront  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;--- source  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;---nodeServer  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;---webFront

#### node.js
在文件夹 source 下的 nodeServer 文件夹下面的，useless.js 即使源文件，将他放在合适的目录，使用的时候在 js 文件下引入：  

    var f = require("useless.js");  
另外若是在同级目录下引入，引入应该是( 注意 " ./ " )：  

    var f = require("./useless.js");
#### 前端（浏览器环境）
在前端html文件像引入其他的js资源一样，建议在 head 标签中引入，以便更好管理：  

    <head>
        <script src="./useless.js"></script>
    </head>  
### 使用
使用的时候应该获得一个 asyncOrder 的实例，在 node 中引入的时候，require 语句返回的对象即是 asyncOrder 的实例；在前端浏览器环境下已经在全局对象上注册了变量 asyncOrder，若出先命名冲突问题，请在引入的文件中修改即可。  
#### 注册异步任务
实例对象.enrol( '任务名称', '任务函数', '任务返回的数据处理函数');  
看下面这段代码：  

    var f = require("./useless.js");
    
    f.enrol("test", function () {
        setTimeout(() => {
            var datas = "I am Groot!";
            
            f.setData(this, datas);   //注意，一定加上。
            
        }, 1000);
    }, function (datas) {
        console.log(datas);
    });  
对于使用的时候唯一需要注意的一点就是在任务函数执行完毕之后，需要执行 asyncOrder 的 setData函数，将获得数据注册到任务队列中该任务的数据上去，另外 setData 的第一个参数一定是 this ，第二个是异步任务获得的数据。  
### 示例demo
#### nodeJs
进入到 **uselessJs/demo/nodeServer** 目录下，node 命令运行 test.js  

    node test.js  
输出结果：  
    
    I am Groot!          //一秒后
    I am Spiderman!     // 两秒后
    I am superman!      // 两秒后  
#### 前端浏览器环境  
进入到 **uselessJs/demo/webFron** 目录下，浏览器打开 test.html，f12看下控制台即可。  
### 待续...



