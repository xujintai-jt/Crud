
// 核心模块
var fs = require('fs')

// 第三方模块
var express = require('express')

// 本地模块
var Students = require('./students')


// 创建一个路由容器
var router = express.Router()

// 将路由挂载到路由容器中
router.get('/students', function (req, res) {
  Students.find(function (err, students) {
    if (err) {
      return res.status(500).send('Server error')
    }
    res.render('index.html', {
      fruits: ['苹果', '苹果', '苹果', '苹果'],
      students: students,
    })
  })
})



router.get('/students/new', function (req, res) {
  res.render('new.html', {
  });
})

// 填写个人信息
router.post('/students/new', function (req, res) {
  new Students(req.body).save(function (err) {
    if (err) {
      return res.status(500).send('Server error')
    }
    console.log('信息添加成功');
    res.redirect('/students')
  })
})


router.get('/students/edit', function (req, res) {
  Students.findById(req.query.id, function (err, student) {
    if (err) {
      return res.status(500).send('Server error')
    }
    res.render('edit.html', {
      student: student
    });
  });
})


router.post('/students/edit', function (req, res) {
  console.log(req.body, req.body.id);
  Students.findByIdAndUpdate(req.body.id, req.body, function (err) {
    if (err) {
      return res.status(500).send('Server error')
    }
    console.log('信息更新成功');
    res.redirect('/students')
  })
})


router.get('/students/delete', function (req, res) {
  Students.findByIdAndRemove(req.query.id, function (err) {
    if (err) {
      return res.status(500).send('Server error')
    }
    console.log('信息删除成功');
    res.redirect('/students')
  })
})



module.exports = router



