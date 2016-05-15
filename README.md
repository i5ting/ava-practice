# ava-practice


## ava 是什么？

未来的测试运行器

https://github.com/sindresorhus/ava

简单的说ava是mocha的替代品，es6语法支持更好，执行效率更高，语义上更简单。

虽然 JavaScript 是单线程，但在 Node.js 里由于其异步的特性使得 IO 可以并行。AVA 利用这个优点让你的测试可以并发执行，这对于 IO 繁重的测试特别有用。另外，测试文件可以在不同的进程里并行运行，让每一个测试文件可以获得更好的性能和独立的环境。在 Pageres 项目中从 Mocha切换 到 AVA 让测试时间从 31 秒下降到 11 秒。测试并发执行强制你写原子测试，意味着测试不需要依赖全局状态或者其他测试的状态，这是一件非常好的事情。


由于并行测试，所以你没法依赖global状态或者其他测试的状态，你必须保证测试的原子性。


## 为什么要用 AVA?

- 轻量和高效
- 简单的测试语法
- 并发运行测试
- 强制编写原子测试
- 没有隐藏的全局变量
- 为每个测试文件隔离环境
- 用 ES2015 编写测试
- 支持 Promise
- 支持 Generator
- 支持 Async
- 支持 Observable
- 强化断言信息
- 可选的 TAP 输出显示
- 简明的堆栈跟踪


## hook


下面例子中，保证在测试save方法之前，执行完成before。也就是说，执行before等待2秒，然后再开始跑其他测试。

```
test.before.cb((t) => {
  setTimeout(() => {
    t.end();
  }, 2000);
});

test('#save()', t => {
  let user = new User({
    username: 'i5ting',
    password: '0123456789'
  });
  
  user.save((err, u) => {
    if (err) log(err)
    t.is(u.username, 'i5ting');
  });
});
```


## db


### 每次连接数据库成功后，最好是dropDatabase

```
var mongoose = require("mongoose");

// 核心代码，是否开启测试
mongoose.set('debug', false);

var db = mongoose.connect("mongodb://127.0.0.1:27017/db_helloworld"); 

db.connection.on("error", function (error) {  
  console.log("数据库连接失败：" + error); 
}); 

db.connection.on("open", function () {  
  console.log("数据库连接成功");
  mongoose.connection.db.dropDatabase();
});

```
