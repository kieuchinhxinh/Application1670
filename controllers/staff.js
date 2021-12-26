const express = require('express')
const async = require('hbs/lib/async')
const {
    insertObject,
    getDB,
    deleteTrainee,
    deleteCategory,
    deleteCourse,
    ObjectId,
    UpdateStaff
} = require('../databaseHandler')
const {
    requireStaff,

} = require('../dbLib')
const router = express.Router()
router.get('/', requireStaff, (req, res) => {
    res.render('staff')
})

router.get('/addTrainee', requireStaff, (req, res) => {
        res.render('addTrainee')
    })
    //Submit add User
router.post('/addTrainee', requireStaff, async(req, res) => {
    const name = req.body.txtName
    const userName = req.body.txtUserName
    const dateofbirth = req.body.txtDate
    const education = req.body.txtEducation
    const email = req.body.txtEmail
    const newTrainee = {
        name: name,
        userName: userName,

        email: email,
        education: education,
        dateofbirth: dateofbirth
    }
    insertObject("trainee", newTrainee)
    res.render('staff')
})


router.get('/addCourseCategory', requireStaff, (req, res) => {
    res.render('addCourseCategory')
})
router.post('/addCourseCategory', requireStaff, async(req, res) => {
    const ccName = req.body.txtName
    const description = req.body.txtDescription
    const newCourseCategory = {
        coursecategoryName: ccName,
        description: description
    }
    await insertObject("coursecategory", newCourseCategory)
    res.redirect('/staff')

})
router.get('/addCourse', requireStaff, (req, res) => {
    res.render('addCourse')
})
router.post('/addCourse', requireStaff, async(req, res) => {
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

router.get('/viewTrainee', requireStaff, async(req, res) => {
    let db = await getDB();
    let results = await db.collection("trainee").find({}).toArray();
    res.render('viewTrainee', {
        trainee: results
    })
})
router.get('/viewCourse', requireStaff, async(req, res) => {
    let db = await getDB();
    let results = await db.collection("course").find({}).toArray();
    res.render('viewCourse', {
        course: results
    })
})

router.get('/viewStaff', requireStaff, async(req, res) => {
    let db = await getDB();
    let results = await db.collection("staff").find({}).toArray();
    res.render('viewStaff', {
        staff: results
    })
})
router.get('/viewCourseCategory', requireStaff, async(req, res) => {
    let db = await getDB();
    let results = await db.collection("coursecategory").find({}).toArray();
    res.render('viewCourseCategory', {
        coursecategory: results
    })
})
router.get('/staff', async(req, res) => {

    res.render('staff')
})

router.get('/viewTrainer', requireStaff, async(req, res) => {
    let db = await getDB();
    let results = await db.collection("trainer").find({}).toArray();
    res.render('viewTrainer', {
        trainer: results
    })
})

router.get('/delete_category', requireStaff, async(req, res) => {
    const ccn = req.query.coursecategoryName;
    await deleteCategory(ccn);
    res.redirect('viewCourseCategory')
})

router.get('/delete_course', requireStaff, async(req, res) => {
    const cn = req.query.courseName;
    await deleteCourse(cn);
    res.redirect('viewCourse')
})
router.get('/delete_trainee', requireStaff, async(req, res) => {
    const us = req.query.userName;
    await deleteTrainee(us);
    res.redirect('viewTrainee')
})

router.get('/staffProfile', requireStaff, async(req, res) => {
    const user = req.session["staff"]
    const db = await getDB();
    const info = await db.collection("staff").findOne({
        "userName": user.name
    });

    res.render('staffProfile', {
        staff: info
    });
})

router.get('/staffUpdateProfile', requireStaff, async(req, res) => {
    const user = req.session["staff"]
    const db = await getDB();
    const info = await db.collection("staff").findOne({
        "userName": user.name
    });

    res.render('staffUpdateProfile', {
        staff: info
    });
})
router.post('/staffUpdateProfile', requireStaff, async(req, res) => {
    const id = req.body.txtId;
    const name = req.body.txtName;
    const age = req.body.txtAge;
    const email = req.body.txtEmail;

    const userName = req.body.txtUserName;
    const address = req.body.txtAddress;
    const filter = {
        _id: ObjectId(id)
    }
    const updateToStaffs = {
        $set: {
            name: name,
            age: age,
            email: email,
            userName: userName,
            address: address,


        }
    }

    const db = await getDB();
    await db.collection('staff').updateOne(filter, updateToStaffs);
    const st = await db.collection('staff').findOne({
        _id: ObjectId(id)
    });

    res.render('staffProfile', {
        staff: st
    });
})
router.get('/staffEditTrainee', requireStaff, async(req, res) => {
    const id = req.query.id;

    const db = await getDB();
    const t = await db.collection("trainee").findOne({
        _id: ObjectId(id)
    });

    res.render('staffEditTrainee', {
        trainee: t
    });
})
router.post('/staffUpdateTrainee', requireStaff, async(req, res) => {
    const id = req.body.txtId;
    const nameInput = req.body.txtName;
    const emailInput = req.body.txtEmail;
    const ageInput = req.body.txtAge;
    const specialtyInput = req.body.txtSpecialty;
    const addressInput = req.body.txtAddress;

    UpdateTrainee(id, nameInput, emailInput, ageInput, specialtyInput, addressInput);

    res.redirect('viewTrainee');
})
router.post('/searchTrainee', requireStaff, async(req, res) => {
    const searchName = req.body.txtSearch;

    const db = await getDB();
    const searchTrainee = await db.collection("trainee").find({
        name: searchName
    }).toArray();

    res.render('viewTrainee', {
        data: searchTrainee
    })
})



router.get('/assignTrainer', requireStaff, (req, res) => {

})

module.exports = router;
