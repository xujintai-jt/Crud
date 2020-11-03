var express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))  //2. use往app上添加方法
app.use(bodyParser.json())

var router = require('./router')


app.engine('html', require('express-art-template'));

app.use('/node_modules/', express.static('./node_modules/'))
app.use('/public/', express.static('./public/'))


// 把路由容器挂载到app服务中
app.use(router)

app.listen(3000, function () {
  console.log('runing 3000...');
})




