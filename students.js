var mongoose = require('mongoose')

// 连接数据库
mongoose.connect('mongodb://localhost/itcast', { useNewUrlParser: true })

// 拿到schema图表
var Schema = mongoose.Schema

// 3.设计集合结构（表结构）
// 用户表
var studentSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  age: {
    type: String,
    require: true
  }
  ,
  gender: {
    type: Number,
    enum: [0, 1],
    default: 0
  },
  hobbies: {
    type: String,
  }
})

//导出模型构造函数               //数据库名字    //架构
module.exports = mongoose.model('Student', studentSchema)