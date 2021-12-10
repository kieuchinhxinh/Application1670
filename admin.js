const express = require('express');
var router = express.Router();

//localhost/admin

router.get('/admin', (req, res) => {
    res.render('admin')
})


//localhost/admin/addUser
router.get('/adminAddStaff', (req, res) => {
    res.render('addUser')
})

router.get('/adminAddTrainer', (req, res) => {
    res.render('addUser')
})

module.exports = router;