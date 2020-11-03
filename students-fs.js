// const { json } = require("body-parser");
var fs = require('fs')
var dbPath = './db.json'

exports.find = function (callback) {
  fs.readFile(dbPath, 'utf8', function (err, data) {
    if (err) {
      return callback(err)
    }
    callback(null, JSON.parse(data).students)
  });
}



exports.save = function (newStudent, callback) {
  // 读取本地数据，获取数据信息
  fs.readFile(dbPath, 'utf8', function (err, data) {
    if (err) {
      return callback(err)
    }
    // 数据读取成功以后，在数据后添加用户新提交的信息
    let students = JSON.parse(data).students
    newStudent.id = students.length ? (students[students.length - 1].id + 1) : 1
    students.push(newStudent)

    var fileData = JSON.stringify({ students })
    // 文件写入
    fs.writeFile(dbPath, fileData, function (err) {
      if (err) {
        return callback(err)
      }
      callback(null)
    })
  })

}


exports.updateById = function (student, callback) {
  fs.readFile(dbPath, 'utf8', function (err, data) {
    if (err) {
      return callback(err)
    }
    // 将字符串转换成对象
    var students = JSON.parse(data).students

    student.id = parseInt(student.id)
    var stu = students.find(item => {
      return item.id === student.id
    })
    for (var key in student) {
      stu[key] = student[key]
    }

    var fileData = JSON.stringify({ students })

    fs.writeFile('./db.json', fileData, function (err) {
      if (err) {
        return callback(err)
      }
      callback(null)
    })
  })
}


exports.findById = function (id, callback) {
  fs.readFile(dbPath, 'utf8', function (err, data) {
    if (err) {
      return callback(err)
    }
    var students = JSON.parse(data).students

    var ret = students.find(item => {
      return item.id === parseInt(id)
    })

    callback(null, ret)
  })
}




exports.deleteById = function (id, callback) {
  fs.readFile(dbPath, 'utf8', function (err, data) {
    if (err) {
      callback(err)
    }
    var students = JSON.parse(data).students

    var ret = students.findIndex(item => {
      return item.id === parseInt(id)
    })
    students.splice(ret, 1)
    var fileData = JSON.stringify({ students })

    fs.writeFile('./db.json', fileData, function (err) {
      if (err) {
        return callback(err)
      }
      callback(null)
    })
  })
}