const express = require('express');
const router = express.Router();

//localhost/admin

router.get('/admin', (req, res) => {
    res.render('admin')
})

router.post('/login', (req, res) => {
    res.redirect("/admin")
})

router.get('/admin/adminAddStaff', (req, res) => {
    res.render('adminAddStaff')
});

router.get('/admin/adminAddTrainer', (req, res) => {
    res.render('adminAddTrainer')
});

router.get('/admin/adminEditStaff', (req, res) => {
    res.render('adminEditStaff')
});

router.get('/admin/adminEditTrainer', (req, res) => {
    res.render('adminEditTrainer')
});


module.exports = router;