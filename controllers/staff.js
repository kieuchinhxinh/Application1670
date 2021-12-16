const express = require('express')
const { insertObject } = require('../databaseHandler')
const { requireStaff } = require('../dbLib')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('staff')
})
router.get('/home', (req, res) => { res.render('staff/index') })

router.get('/staffAddTrainee', (req, res) => {
        res.render('staffAddTrainee')
    })
    //Submit add User
router.post('/staffAddTrainee', (req, res) => {
    const name = req.body.txtName
    const userName = req.body.txtUserName
    const dateofbirth = req.body.txtDate
    const education = req.body.txtEducation
    const email = req.body.txtEmail
    const trainee = {
        name: name,
        userName: userName,
        age: age,
        email: email,
        education: education,
        dateofbirth: dateofbirth
    }
    insertObject("trainee", objectToInsert)
    res.render('staff')
})


router.get('/staffAddCourseCategory', (req, res) => { res.render('staffAddCourseCategory') })
router.post('/staffAddCourseCategory', async(req, res) => {
    const ccName = req.body.txtName
    const description = req.body.txtDescription
    const coursecategory = {
        coursecategoryName: ccName,
        description: description
    }
    await insertObject("coursecategory", coursecategory)
    res.redirect('/staff')

})

module.exports = router;