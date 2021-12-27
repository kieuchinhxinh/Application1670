const express = require('express')
const {
    insertObject,
    getDB
} = require('../databaseHandler')
const {
    requireTrainer
} = require('../dbLib')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('trainerIndex')
})

//cham diem
router.post('/MarkTrainee', async(req, res) => {
    const name = req.body.txtName
    const grade = req.body.txtGrade
    const grade_trainee = {
        name: name,
        grade: grade
    }
    await insertObject("traineegrade", grade_trainee)
    res.redirect('/trainer/trainerMarkTrainee')

})
router.get('/trainerMarkTrainee', (req, res) => {
    res.render('trainerMarkTrainee')
})
router.get('/trainerProfileUpdate', (req, res) => {
        res.render('trainerProfileUpdate')
    })
    //------------------
    //view
router.get('/viewTrainee', async(req, res) => {
    let db = await getDB();
    let results = await db.collection("trainee").find({}).toArray();
    res.render('trainerViewTrainee', {
        trainee: results
    })

})
router.get('/viewTraineegrade', async(req, res) => {
        let db = await getDB();
        let results = await db.collection("traineegrade").find({}).toArray();
        res.render('trainerViewTraineePassFail', {
            traineegrade: results
        })
    })
    //-----------------





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
        // age: age,
        email: email,
        education: education,
        dateofbirth: dateofbirth
    }
    insertObject("trainee", newTrainee)
    res.render('staff')
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
    const description = req.body.txtDescription
    const trainerId = req.body.txtTrainerId

    const newCourse = {
        courseName: name,
        description: description,
        trainerId: trainerId,

    }
    await insertObject("course", newCourse)
    res.redirect('/staff')

})


router.get('/trainerViewCourse', async(req, res) => {
    let db = await getDB();
    let results = await db.collection("course").find({}).toArray();
    res.render('trainerViewCourse', {
        course: results
    })

})
module.exports = router;










































// const express = require('express')
// const {
//     insertObject,getDB
// } = require('../databaseHandler')
// const {
//     requireStaff
// } = require('../dbLib')
// const router = express.Router()

// router.get('/', (req, res) => {
//     res.render('trainerIndex')
// })

// //cham diem
// router.post('/MarkTrainee',async (req,res)=>{
//     const name = req.body.txtName
//     const grade = req.body.txtGrade
//     const grade_trainee = {
//         name: name,
//         grade: grade
//     }
//     await insertObject("traineegrade",grade_trainee)
//     res.redirect('/trainer/trainerMarkTrainee')

// })
// router.get('/trainerMarkTrainee',(req,res)=>{
//     res.render('trainerMarkTrainee')
// })
// router.get('/trainerProfileUpdate',(req,res)=>{
//     res.render('trainerProfileUpdate')
// })
// //------------------
// //view
// router.get('/viewTrainee', async(req, res) => {
//     let db = await getDB();
//     let results = await db.collection("trainee").find({}).toArray();
//     res.render('trainerViewTrainee', {
//         trainee : results
//     })
    
// })
// router.get('/viewTraineegrade', async(req, res) => {
//     let db = await getDB();
//     let results = await db.collection("traineegrade").find({}).toArray();
//     res.render('trainerViewTraineePassFail', {
//         traineegrade : results
//     })
// })
// //-----------------





// router.get('/', (req, res) => {
//     res.render('staff')
// })
// router.get('/addTrainee', (req, res) => {
//         res.render('addTrainee')
//     })
//     //Submit add User
// router.post('/addTrainee', (req, res) => {
//     const name = req.body.txtName
//     const userName = req.body.txtUserName
//     const dateofbirth = req.body.txtDate
//     const education = req.body.txtEducation
//     const email = req.body.txtEmail
//     const newTrainee = {
//         name: name,
//         userName: userName,
//        // age: age,
//         email: email,
//         education: education,
//         dateofbirth: dateofbirth
//     }
//     insertObject("trainee", newTrainee)
//     res.render('staff')
// })


// router.get('/addCourseCategory', (req, res) => {
//     res.render('addCourseCategory')
// })
// router.post('/addCourseCategory', async(req, res) => {
//     const ccName = req.body.txtName
//     const description = req.body.txtDescription
//     const newCourseCategory = {
//         coursecategoryName: ccName,
//         description: description
//     }
//     await insertObject("coursecategory", newCourseCategory)
//     res.redirect('/staff')

// })
// router.get('/addCourse', (req, res) => {
//     res.render('addCourse')
// })
// router.post('/addCourse', async(req, res) => {
//     const name = req.body.txtName
//     const description = req.body.txtDescription
//     const trainerId = req.body.txtTrainerId

//     const newCourse = {
//         courseName: name,
//         description: description,
//         trainerId: trainerId,

//     }
//     await insertObject("course", newCourse)
//     res.redirect('/staff')

// })


// module.exports = router;
