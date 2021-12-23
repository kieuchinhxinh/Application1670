const express = require('express')
const {
    insertObject,
    getDB,
    deleteTrainee,
    deleteCategory,
    deleteCourse
} = require('../databaseHandler')
const {
    requireStaff
} = require('../dbLib')
const router = express.Router()
router.get('/', (req, res) => {
    res.render('staff')
})

router.get('/addTrainee', (req, res) => {
        res.render('addTrainee')
    })
    //Submit add User
router.post('/addTrainee', (req, res) => {
    const name = req.body.txtName
    const userName = req.body.txtUserName
    const dateofbirth = req.body.txtDate
    const education = req.body.txtEducation
    const email = req.body.txtEmail
    const newTrainee = {
        name: name,
        userName: userName,
        age: age,
        email: email,
        education: education,
        dateofbirth: dateofbirth
    }
    insertObject("trainee", newTrainee)
    res.render('/staff')
})


router.get('/addCourseCategory', (req, res) => {
    res.render('addCourseCategory')
})
router.post('/addCourseCategory', async(req, res) => {
    const ccName = req.body.txtName
    const description = req.body.txtDescription
    const newCourseCategory = {
        coursecategoryName: ccName,
        description: description
    }
    await insertObject("coursecategory", newCourseCategory)
    res.redirect('/staff')

})
router.get('/addCourse', (req, res) => {
    res.render('addCourse')
})
router.post('/addCourse', async(req, res) => {
    const name = req.body.txtName
    const courseId = req.body.txtCourseId
    const trainerId = req.body.txtTrainerId

    const newCourse = {
        courseName: name,
        courseId: courseId,
        trainerId: trainerId,

    }
    await insertObject("course", newCourse)
    res.redirect('/staff')

})

router.get('/viewTrainee', async(req, res) => {
    let db = await getDB();
    let results = await db.collection("trainee").find({}).toArray();
    res.render('viewTrainee', {
        trainee: results
    })
})
router.get('/viewCourse', async(req, res) => {
    let db = await getDB();
    let results = await db.collection("course").find({}).toArray();
    res.render('viewCourse', {
        course: results
    })
})

router.get('/viewStaff', async(req, res) => {
    let db = await getDB();
    let results = await db.collection("staff").find({}).toArray();
    res.render('viewStaff', {
        staff: results
    })
})
router.get('/viewCourseCategory', async(req, res) => {
    let db = await getDB();
    let results = await db.collection("coursecategory").find({}).toArray();
    res.render('viewCourseCategory', {
        coursecategory: results
    })
})



router.get('/delete_category', async(req, res) => {
    const ccn = req.query.coursecategoryName;
    await deleteCategory(ccn);
    res.redirect('viewCourseCategory')
})

module.exports = router;
