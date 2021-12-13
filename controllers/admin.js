const express = require('express')
const { insertObject } = require('../databaseHandler')
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


module.exports = router;