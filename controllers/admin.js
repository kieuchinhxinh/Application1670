const express = require('express')
const { insertObject } = require('../databaseHandler')
const { requireAdmin } = require('../dbLib')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('admin')
})

router.get('/addUser', (req, res) => {
        res.render('adminAddUser')
    })
    //Submit add User
router.post('/addUser', (req, res) => {
    const name = req.body.txtName
    const role = req.body.Role
    const pass = req.body.txtPassword
    const objectToInsert = {
        userName: name,
        role: role,
        password: pass
    }
    insertObject("Users", objectToInsert)
    res.render('admin')
})
router.post('/adminAddTrainer', async(req, res) => {
    const name = req.body.txtName
    const userName = req.body.txtUserName
    const age = req.body.txtAge
    const email = req.body.txtEmail
    const specialty = req.body.txtSpecialty
    const address = req.body.txtAddress

    const trainer = {
        name: name,
        userName: userName,
        age: age,
        email: email,
        specialty: specialty,
        address: address
    }
    await insertObject("trainer", trainer)
    res.redirect('/admin')

})
router.get('/adminAddTrainer', (req, res) => {
    res.render('adminAddTrainer')
})
router.get('/adminViewTrainer', async(req, res) => {
    let listTrainer = await trainer.find();
    res.render('adminViewTrainer', { listTrainer: listTrainer })
})

router.post('/adminAddStaff', async(req, res) => {
    const name = req.body.txtName
    const userName = req.body.txtUserName
    const age = req.body.txtAge
    const email = req.body.txtEmail
    const specialty = req.body.txtSpecialty
    const address = req.body.txtAddress

    const staff = {
        name: name,
        userName: userName,
        age: age,
        email: email,
        address: address
    }
    await insertObject("staff", staff)
    res.redirect('/admin')

})
router.get('/adminAddStaff', (req, res) => {
    res.render('adminAddStaff')
})
module.exports = router;