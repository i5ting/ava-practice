# ava-practice


## ava 是什么？

未来的测试运行器

https://github.com/sindresorhus/ava

简单的说ava是mocha的替代品，

- es6语法支持更好，对aysnc/await有支持
- 执行效率更高，使用io并发，就必须保证测试的原子性
- 语义上更简单，集众家之长

虽然 JavaScript 是单线程，但在 Node.js 里由于其异步的特性使得 IO 可以并行。AVA 利用这个优点让你的测试可以并发执行，这对于 IO 繁重的测试特别有用。另外，测试文件可以在不同的进程里并行运行，让每一个测试文件可以获得更好的性能和独立的环境。在 Pageres 项目中从 Mocha切换 到 AVA 让测试时间从 31 秒下降到 11 秒。测试并发执行强制你写原子测试，意味着测试不需要依赖全局状态或者其他测试的状态，这是一件非常好的事情。

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

## AVS VS Mocha 

![Ava Vs Mocha](img/ava-vs-mocha.png)

[origin](https://github.com/koajs/koa/issues/703)

## hook


最简单的回调，注意写法，`test.cb`意味着这是需要调用`t.end()`才能结束，对于测试异步方法非常好用

```
test.cb('#register()', t => {
  user.save((err, u) => {
    console.log(err)
    console.log('u=' + u)
    t.true(u.password.length > 50)
    t.end()
  })
});
```

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

## Control flow

- Promise
- Generator
- Async/await

### Promise 支持

If you return a promise in the test you don't need to explicitly end the test as it will end when the promise resolves.

```
test(t => {
    return somePromise().then(result => {
        t.is(result, 'unicorn');
    });
});
```
### Generator 函数支持

AVA comes with built-in support for generator functions.

```
test(function * (t) {
    const value = yield generatorFn();
    t.true(value);
});
```

具体在mongoose里的generator里使用

```
test('#save()', function * (t) {
  var u = yield User.create(user)
  t.is(u.username, 'i5ting');
});
```

测试console.log或者其他终端输出内容，推荐使用co-exec，然后将结果正则匹配就好了

```
import test from 'ava';

var exec = require('co-exec');

test('exec()', function * (t) {
    var commit = yield exec('ls -alt|grep .gitignore|wc -l');
    console.log(commit)
    t.true(commit == 1);
});

test('exec2()', function * (t) {
  var result = yield exec('ls -alt')
  
  console.log(result.trim().match(/(gitignore)/))
  
  t.true(result.trim().match(/(gitignore)/).length > 1);
  t.regex(result, /(gitignore)/);
});
```

还有一个断言t.regex,不过不太容易判断

### Async/await支持

AVA comes with built-in support for async functions (async/await).

```
test(async function (t) {
    const value = await promiseFn();
    t.true(value);
});

// async arrow function
test(async t => {
    const value = await promiseFn();
    t.true(value);
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


## 测试覆盖率

https://github.com/bcoe/nyc


Just install both:

```
$ npm install --save-dev nyc ava
```

They you can add this to package.json:

```
"scripts": {
  "test": "nyc ava"
}
```

集成其他badge也很简单，看它的文档即可


