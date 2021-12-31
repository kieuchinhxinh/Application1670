// @ts-ignore
// @ts-ignore
const express = require('express')
    // @ts-ignore
    // @ts-ignore
const async = require('hbs/lib/async')
const {
    insertObject,
    getDB,
    deleteTrainee,
    deleteCategory,
    deleteCourse,
    ObjectId,
    // @ts-ignore
    // @ts-ignore
    UpdateStaff,
    // @ts-ignore
    // @ts-ignore
    UpdateTrainee,
    // @ts-ignore
    // @ts-ignore
    UpdateCourse,
    searchTrainee
} = require('../databaseHandler')
const {
    requireStaff
} = require('../dbLib')
const router = express.Router()
router.get('/', requireStaff, (req, res) => {
    res.render('staff')
})

router.get('/addTrainee', (req, res) => {
        res.render('addTrainee')
    })
    //Submit add User

router.get('/addCourseCategory', requireStaff, (req, res) => {
    res.render('addCourseCategory')
})
router.post('/addTrainee', requireStaff, async(req, res) => {

    const userName = req.body.txtUser;
    const pass = req.body.txtPass;
    const name = req.body.txtName;
    const email = req.body.txtEmail;
    const dob = req.body.txtDate;
    const address = req.body.txtAddress;
    const education = req.body.txtSpecialty;
    const Course = [];

    const newAccountTrainee = {
        userName: userName,
        role: 'Trainee',
        password: pass
    }
    const newProfileTrainee = {
        userName: userName,
        passWord: pass,
        name: name,
        email: email,
        dateofbirth: dob,
        address: address,
        education: education,
        Course: Course,
        role: 'Trainee'
    }

    insertObject('Users', newAccountTrainee);
    insertObject('trainee', newProfileTrainee);

    res.redirect('viewTrainee');
})
router.post('/addCourseCategory', requireStaff, async(req, res) => {
        const ccName = req.body.txtName
        const description = req.body.txtDescription
        const newCourseCategory = {
            categoryName: ccName,
            description: description
        }
        await insertObject("coursecategory", newCourseCategory)
        res.redirect('/staff')

    })
    // @ts-ignore
    // @ts-ignore
router.get('/addCourse', (req, res) => {
    res.render('addCourse')
})
router.post('/addCourse', requireStaff, async(req, res) => {
    const courseId = req.body.txtCourseID;
    const courseName = req.body.txtNameCourse;
    const tutor = req.body.txtTutor;
    const categoryName = req.body.txtCategoryCourse;
    const description = req.body.txtDescription;
    const trainee = [];

    const newCourse = {
        courseID: courseId,
        courseName: courseName,
        tutor: tutor,
        categoryCourse: categoryName,
        descriptionCourse: description,
        trainee: trainee

    }
    await insertObject("course", newCourse)
    res.redirect('viewCourse');

})

// @ts-ignore
// @ts-ignore
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

router.get('/staff', requireStaff, async(req, res) => {

        res.render('staff')
    })
    // @ts-ignore
    // @ts-ignore
router.get('/viewTrainer', requireStaff, async(req, res) => {
    let db = await getDB();
    let results = await db.collection("trainer").find({}).toArray();
    res.render('viewTrainer', {
        trainer: results
    })
})
router.post('/editCourseCategory', requireStaff, async(req, res) => {
    const id = req.body.txtId;
    const coursecategory_Name = req.body.txtCourseCategoryName;
    const description_CourseCategory = req.body.txtDescriptionCourseCategory;

    const updateToCourseCategory = {
        $set: {
            courseCategoryName: coursecategory_Name,
            descriptionCourseCategory: description_CourseCategory,
        }
    }
    const filter = {
        _id: ObjectId(id)
    }
    const dbo = await getDB()
    await dbo.collection("CourseCategory").updateOne(filter, updateToCourseCategory)

    const coursecategory = await dbo.collection("CourseCategory").findOne({
        "_id": ObjectId(id)
    })
    res.render('viewCourseCategory', {
        bas: coursecategory
    })
})
router.get('/staffUpdateTrainee', requireStaff, async(req, res) => {
    const id = req.query.id;
    const db = await getDB();
    const te = await db.collection("trainee").findOne({
        _id: ObjectId(id)
    });

    res.render('staffUpdateTrainee', {
        trainee: te
    });
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
        // @ts-ignore
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
        // @ts-ignore
        _id: ObjectId(id)
    });

    res.render('staffProfile', {
        staff: st
    });
})

router.post('/staffUpdateTrainee', requireStaff, async(req, res) => {
    const id = req.body.txtId;
    const name = req.body.txtName;
    const email = req.body.txtEmail;
    const dob = req.body.txtAge;
    const education = req.body.txtEducation;
    const address = req.body.txtAddress
    const UpdateTrainee = {
        $set: {
            id: id,
            name: name,
            education: education,
            email: email,
            address: address,
            dateofbirth: dob,
        }

    }
    res.redirect('viewTrainee')
})



//End code
router.get('/staffUpdateCourse', requireStaff, async(req, res) => {
    const id = req.query.id;

    const db = await getDB();
    const info = await db.collection("course").findOne({
        // @ts-ignore
        _id: ObjectId(id)
    });

    res.render('staffUpdateCourse', {
        course: info
    });
})
router.post('/staffUpdateCourse', requireStaff, async(req, res) => {
        const id = req.body.txtId;
        const courseName = req.body.txtName
        const courseId = req.body.txtCourseId
        const trainerId = req.body.txtTrainerId
        const filter = {
            // @ts-ignore
            _id: ObjectId(id)
        }
        const UpdateCourse = {
            $set: {
                courseName: courseName,
                courseId: courseId,
                trainerId: trainerId,

            }
        }

        const db = await getDB();
        await db.collection('course').updateOne(filter, UpdateCourse);
        const c = await db.collection('course').findOne({
            // @ts-ignore
            _id: ObjectId(id)
        });

        res.render('viewCourse', {
            course: c
        });
    })
    // @ts-ignore
    // @ts-ignore
router.get('/assignTrainer', (req, res) => {
    res.render('assignTrainer')
})

// @ts-ignore
// @ts-ignore
router.get('/assignTrainee', requireStaff, (req, res) => {
    res.render('assignTrainee')
})
router.post('/addTrainer', requireStaff, async(req, res) => {
        const name = req.body.txtName
        const userName = req.body.txtUserName
        const age = req.body.txtAge
        const email = req.body.txtEmail
        const specialty = req.body.txtSpecialty
        const address = req.body.txtAddress
        const newTrainer = {
            name: name,
            userName: userName,
            age: age,
            email: email,
            specialty: specialty,
            address: address
        }
        await insertObject("trainers", newTrainer)
        res.redirect('/staff')

    })
    // @ts-ignore
    // @ts-ignore
router.get('/addTrainer', requireStaff, (req, res) => {
    res.render('addTrainer')
})

router.get('/deleteTraineeCourseDetail', requireStaff, async(req, res) => {
        let id = req.body.id;
        // if(req.body.hasOwnProperty(1)){
        //     console.log("butt1 clicked");
        // }
        // console.log(id);
        // @ts-ignore
        let course_detail = await courseDetail.findById(id);
        let index = 0;
        for (let i = 0; i < course_detail.trainees.length; i++) {
            if (req.body.hasOwnProperty(i)) {
                index = i;
                break;
            }
        }
        console.log(course_detail.trainees[index]);
        // @ts-ignore
        await courseDetail.findByIdAndUpdate({
            _id: id
        }, {
            $pull: {
                trainees: course_detail.trainees[index]
            }
        })
        res.redirect('/staff/viewCourseDetail');
    })
    // @ts-ignore
module.exports = router;
