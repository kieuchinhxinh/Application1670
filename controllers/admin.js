const express = require('express')
const {
    insertObject,
    deleteStaff,
    getDB
} = require('../databaseHandler')
const {
    requireAdmin
} = require('../dbLib')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('admin')
})

router.get('/addUser', (req, res) => {
        res.render('addUser')
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
router.post('/addTrainer', async(req, res) => {
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
router.get('/addTrainer', (req, res) => {
    res.render('addTrainer')
})
//
router.get('/viewTrainer', async(req, res) => {
    let db = await getDB();
    let results = await db.collection("trainer").find({}).toArray();
    res.render('viewTrainer', {
        trainer: results
    })
})
router.post('/addStaff', async(req, res) => {
    const name = req.body.txtName
    const userName = req.body.txtUserName
    const age = req.body.txtAge
    const email = req.body.txtEmail
    const specialty = req.body.txtSpecialty
    const address = req.body.txtAddress

    const newStaff = {
        name: name,
        userName: userName,
        age: age,
        email: email,
        address: address
    }
    await insertObject("staff", newStaff)
    res.redirect('/admin')

})
router.get('/adViewStaff', async(req, res) => {
    let db = await getDB();
    let results = await db.collection("staff").find({}).toArray();
    res.render('adViewStaff', {
        staff: results
    })
})
router.get('/adViewTrainee', async(req, res) => {
    let db = await getDB();
    let results = await db.collection("trainee").find({}).toArray();
    res.render('adViewTrainee', {
        trainee: results
    })
})

router.get('/addStaff', (req, res) => {
    res.render('addStaff')
})
router.get('/delete_staff', async(req, res) => {
    const us = req.query.userName;
    await deleteStaff(us);
    res.redirect('adViewStaff')
})
module.exports = router;