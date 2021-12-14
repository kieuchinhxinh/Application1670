// const express = require('express');

// const dbLib = require('../dbLib');
// const bcrypt = require('bcryptjs');

// exports.staffindex = async(req, res) => {
//     res.render('staffIndex', { loginName: req.session.email });
// }
// exports.updateProfile = async(req, res) => {
//     let profile = await staff.findOne({ email: req.session.email });
//     console.log(profile)
//     res.render('staffUpdateProfile', { aStaff: profile, loginName: req.session.email });
// }
// exports.doUpdateProfile = async(req, res) => {
//     let id = req.body.id;
//     let aStaff = await staff.findById(id);
//     if (req.file) {
//         aStaff.img = req.file.filename;
//     }
//     aStaff.name = req.body.name;
//     aStaff.age = req.body.age;
//     aStaff.address = req.body.address;
//     try {
//         aStaff = await aStaff.save();
//         res.redirect('/staff');
//     } catch (error) {
//         console.log(error);
//         res.redirect('/staff/updateProfile');
//     }
// }
// exports.changePassword = async(req, res) => {
//     res.render('staffChangePassword', { loginName: req.session.email })
// }
// exports.doChangePassword = async(req, res) => {
//     let acc = await Account.findOne({ email: req.session.email });
//     let oldpw = req.body.old;
//     let newpw = req.body.new;
//     let confirmpw = req.body.confirm;
//     let errors = {};
//     let flag = true;
//     try {
//         await bcrypt.compare(oldpw, acc.password)
//             .then((doMatch) => {
//                 if (doMatch) {
//                     if (newpw.length < 8) {
//                         flag = false;
//                         Object.assign(errors, { length: "Password must contain 8 characters or more!" });
//                     } else if (newpw != confirmpw) {
//                         flag = false;
//                         Object.assign(errors, { check: "New Password and Confirm Password do not match!" });
//                     }
//                 } else {
//                     flag = false;
//                     console.log(acc.password);
//                     Object.assign(errors, { current: "Old password is incorrect!" });
//                 }
//             });
//         console.log(flag);
//         console.log(errors);
//         if (!flag) {
//             res.render('staffChangePassword', { errors: errors, loginName: req.session.email })
//         } else {
//             await bcrypt.genSalt(10, (err, salt) => {
//                 bcrypt.hash(newpw, salt, (err, hash) => {
//                     if (err) throw err;
//                     acc.password = hash;
//                     acc = acc.save();
//                 })
//             });

//             req.session.user = acc;
//             res.redirect('/staff')
//         }
//     } catch (err) {
//         console.log(err);
//         res.redirect('/staff/changePassword')
//     }

// }

// //trainee
// exports.viewAllTrainee = async(req, res) => {
//     let trainees = await trainee.find();
//     res.render('staffTrainee', { trainees: trainees, loginName: req.session.email });
// }
// exports.addTrainee = async(req, res) => {
//     res.render('staffAddTrainee', { loginName: req.session.email });
// }
// exports.doAddTrainee = async(req, res) => {
//     let newAccount = new Account({
//         email: req.body.email,
//         password: "12345678",
//         Role: "trainee"
//     });
//     let newTrainee;
//     if (req.file) {
//         newTrainee = new trainee({
//             name: req.body.name,
//             email: req.body.email,
//             dateOfBirth: new Date(req.body.date),
//             education: req.body.education,
//             img: req.file.filename
//         });
//     } else {
//         newTrainee = new trainee({
//             name: req.body.name,
//             email: req.body.email,
//             dateOfBirth: new Date(req.body.date),
//             education: req.body.education
//         });
//     }
//     try {
//         await bcrypt.genSalt(10, (err, salt) => {
//             bcrypt.hash(newAccount.password, salt, (err, hash) => {
//                 if (err) throw err;
//                 newAccount.password = hash;
//                 newAccount = newAccount.save();
//                 newTrainee = newTrainee.save();
//             });
//         });

//         // console.log(newTrainee);
//         res.redirect('/staff/trainee');
//     } catch (error) {
//         console.log(error);
//         res.redirect('/staff/trainee');
//     }
// }
// exports.editTrainee = async(req, res) => {
//     let id = req.query.id;
//     let traineeEdit = await trainee.findById(id);
//     console.log(traineeEdit);
//     res.render('staffEditTrainee', { aTrainee: traineeEdit, loginName: req.session.email })
// }
// exports.doEditTrainee = async(req, res) => {
//     let id = req.body.id;
//     let aTrainee = await trainee.findById(id);
//     if (req.file) {
//         aTrainee.img = req.file.filename;
//     }
//     aTrainee.dateOfBirth = new Date(req.body.date);
//     aTrainee.education = req.body.education;
//     try {
//         aTrainee = await aTrainee.save();
//         res.redirect('/staff/trainee');
//     } catch (error) {
//         console.log()
//         res.redirect('/staff/trainee');
//     }

// }
// exports.deleteTrainee = async(req, res) => {
//     let id = req.query.id;
//     let aTrainee = await trainee.findById(id);
//     let name = aTrainee.name;
//     await courseDetail.updateMany({ $pull: { trainees: name } })
//     let email = aTrainee.email;
//     let acc = await Account.findOne({ 'email': email });
//     let idacc = acc.id;
//     await Account.findByIdAndRemove(idacc);
//     await trainee.findByIdAndRemove(id);
//     res.redirect('/staff/trainee');
// }
// exports.searchTrainee = async(req, res) => {
//     const searchText = req.body.keyword;
//     //console.log(req.body.keyword);
//     let trainees;
//     let checkAlphaName = validation.checkAlphabet(searchText);
//     let checkEmpty = validation.checkEmpty(searchText);
//     const searchCondition = new RegExp(searchText, 'i');

//     //console.log(checkEmpty);
//     if (!checkEmpty) {
//         res.redirect('/staff/trainee');
//     } else if (!checkAlphaName) {
//         let finddate = new Date(searchText);
//         trainees = await trainee.find({ dateOfBirth: finddate });
//         res.render('staffTrainee', { trainees: trainees, loginName: req.session.email });
//     } else {
//         trainees = await trainee.find({ name: searchCondition });
//         res.render('staffTrainee', { trainees: trainees, loginName: req.session.email });
//     }
// }

// //category
// exports.viewAllCategory = async(req, res) => {
//     let categories = await category.find();
//     res.render('staffCourseCategory', { categories: categories, loginName: req.session.email });
// }
// exports.addCategory = async(req, res) => {
//     res.render('staffAddCourseCategory', { loginName: req.session.email });
// }
// exports.doAddCategory = async(req, res) => {
//     let newCategory = new category({
//         categoryName: req.body.name,
//         description: req.body.description,
//     });
//     newCategory = await newCategory.save();
//     res.redirect('/staff/courseCategory');
// }
// exports.editCategory = async(req, res) => {
//     let id = req.query.id;
//     let Categoryedit = await category.findById(id);
//     console.log(Categoryedit);
//     res.render('staffEditCourseCategory', { aCategory: Categoryedit, loginName: req.session.email })
// }
// exports.doEditCategory = async(req, res) => {
//     let id = req.body.id;
//     let aCategory = await category.findById(id);
//     aCategory.description = req.body.description;
//     try {
//         aCategory = await aCategory.save();
//         res.redirect('/staff/courseCategory');
//     } catch (error) {
//         console.log(error);
//         res.redirect('/staff/courseCategory');
//     }
// }
// exports.deleteCategory = async(req, res) => {
//     let id = req.query.id;
//     console.log(id);
//     await category.findByIdAndRemove(id);
//     res.redirect('/staff/courseCategory');
// }
// exports.searchCategory = async(req, res) => {
//     const searchText = req.body.keyword;
//     //console.log(req.body.keyword);
//     const searchCondition = new RegExp(searchText, 'i')
//     let categories = await category.find({ categoryName: searchCondition });
//     //console.log(categories);
//     res.render('staffCourseCategory', { categories: categories, loginName: req.session.email });
// }

// // ========================= COURSE =======================================
// // ========================================================================

// // add course
// exports.addCourse = async(req, res) => {
//     let name = req.body.name;
//     let description = req.body.description;
//     let name_category = req.body.category;
//     let check = true;
//     let checkAlphaName = validation.checkAlphabet(name);
//     let checkAlphaDes = validation.checkAlphabet(description);
//     console.log(checkAlphaDes);
//     check &= checkAlphaName & checkAlphaDes;
//     console.log(check);
//     if (!check) {
//         let categories = await category.find();
//         err_courseName = "", err_description = "";
//         if (!checkAlphaName) err_courseName = "You must enter characters in alphabet";
//         if (!checkAlphaDes) err_description = "You must enter characters in alphabet";
//         res.render('staffAddCourse', {
//             errors: { err_courseName, err_description },
//             old: { name, description },
//             _categories: categories,
//             loginName: req.session.email
//         });
//     } else {
//         let newCourse = new Course({
//             name: name,
//             category: name_category,
//             description: description
//         })
//         try {
//             newCourse = await newCourse.save();
//             console.log(newCourse);

//         } catch (error) {
//             console.log(error);
//         }
//         res.redirect('/staff/course');
//     }

// }

// // View all course
// exports.viewAllCourse = async(req, res) => {
//     let course = await Course.find();
//     res.render('staffCourse', { _course: course, loginName: req.session.email })
// }

// // Click Edit Course
// exports.clickEditCourse = async(req, res) => {
//     let id = req.query.id;
//     let course = await Course.findById(id);
//     let categories = await category.find();
//     //console.log(course);
//     res.render('staffEditCourse', { _course: course, _categories: categories, loginName: req.session.email })
// }

// // Do Edit Course 
// exports.doEditCourse = async(req, res) => {
//     let id = req.body.id;

//     course = await Course.findById(id);

//     course.name = req.body.name;
//     course.category = req.body.category;
//     course.description = req.body.description;
//     try {
//         course = await course.save();
//         res.redirect('/staff/course');
//     } catch (error) {
//         console.log(error);
//         res.redirect('/staff/course');
//     }
// }

// // Seach Course 
// exports.doSearchCourse = async(req, res) => {
//     const searchText = req.body.keyword;
//     console.log(searchText);
//     const searchCondition = new RegExp(searchText, 'i')
//     let course = await Course.find({ name: searchCondition });
//     console.log(course);
//     res.render('staffCourse', { _course: course, loginName: req.session.email })
// }

// // Delete Course
// exports.doDeleteCourse = async(req, res) => {
//     let id = req.query.id;
//     let course_name = await Course.findById(id);
//     await Course.findByIdAndRemove(id).then(data = {});
//     await courseDetail.remove({ name: course_name.name });
//     res.redirect('/staff/course');
// }


// // ========================= COURSE DETAIL ================================
// // ========================================================================

// // Add Course Detail
// exports.addCourseDetail = async(req, res) => {
//     let course_name = req.body.name;
//     let name_category = req.body.category;
//     let name_trainer = req.body.trainer;
//     let name_trainee = req.body.trainee;
//     let check = true;
//     let categories = await category.find();
//     let check_courseName = await dbHandler.checkExisted(Course, course_name) !== null;
//     let check_trainerName = await dbHandler.checkExisted(trainer, name_trainer) !== null;
//     let check_traineeName = await dbHandler.checkExisted(trainee, name_trainee) !== null;
//     check &= check_courseName & check_trainerName & check_traineeName;
//     console.log(check);
//     if (!check) {
//         err_courseName = "", err_trainerName = "", err_traineeName = "";
//         if (!check_courseName) err_courseName = "Course name is not exist!";
//         if (!check_trainerName) err_trainerName = "Trainer name is not exist!";
//         if (!check_traineeName) err_traineeName = "Trainee name is not exist!";
//         res.render('staffAssignT', {
//             _categories: categories,
//             old: { course_name, name_trainer, name_trainee },
//             errors: {
//                 err_courseName,
//                 err_trainerName,
//                 err_traineeName,
//                 loginName: req.session.email
//             }
//         })
//     } else {
//         await courseDetail.findOne({ $and: [{ 'name': course_name }, { 'category': name_category }, { 'trainer': name_trainer }] }).then(data => {
//             if (data) {
//                 try {
//                     for (let item of data.trainees) {
//                         if (item === name_trainee) {
//                             check = false;
//                             break;
//                         }
//                     }
//                     if (check) {
//                         data.trainees.push(name_trainee);
//                         data.save();
//                         console.log(1);
//                         res.redirect('/staff/courseDetail');
//                     } else {
//                         res.render('staffAssignT', {
//                             err: "Trainee existed in this course!",
//                             _categories: categories,
//                             old: { course_name, name_trainer, name_trainee },
//                             loginName: req.session.email
//                         })
//                     }
//                 } catch (error) {
//                     console.log(error);
//                 }

//             } else {
//                 let newCourseDetail = new courseDetail({
//                     name: course_name,
//                     category: name_category,
//                     trainer: name_trainer,
//                     trainees: name_trainee
//                 })
//                 try {
//                     newCourseDetail.save();
//                 } catch (error) {
//                     console.log(error);
//                 }
//                 res.redirect('/staff/courseDetail');
//             }
//         });

//     }
// }

// // View All Course Details
// exports.viewAllCourseDetail = async(req, res) => {
//     let course_detail = await courseDetail.find();
//     res.render('staffCourseDetail', { _course_detail: course_detail, loginName: req.session.email })
// }

// // Delete Course Details
// exports.deleteCourseDetail = async(req, res) => {
//     let id = req.query.id;
//     await courseDetail.findByIdAndRemove(id).then(data = {});
//     res.redirect('/staff/courseDetail');
// }

// // View Inside A Course Detail
// exports.viewInsideCourseDetail = async(req, res) => {
//     let id = req.query.id;
//     let course_detail = await courseDetail.findById(id);
//     let trainees_detail = [];
//     for (let item of course_detail.trainees) {
//         try {
//             //console.log(item);
//             let a_trainee = await trainee.findOne({ name: item });
//             trainees_detail.push(a_trainee);
//         } catch (error) {
//             console.log(error);
//         }
//     }
//     res.render('staffViewCourseDetail', {
//         _course_detail: course_detail,
//         _trainees_detail: trainees_detail,
//         loginName: req.session.email
//     });
// }

// // Delete a trainee in course details
// exports.deleteTraineeCourseDetail = async(req, res) => {
//     let id = req.body.id;
//     // if(req.body.hasOwnProperty(1)){
//     //     console.log("butt1 clicked");
//     // }
//     // console.log(id);
//     let course_detail = await courseDetail.findById(id);
//     let index = 0;
//     for (let i = 0; i < course_detail.trainees.length; i++) {
//         if (req.body.hasOwnProperty(i)) {
//             index = i;
//             break;
//         }
//     }
//     console.log(course_detail.trainees[index]);
//     await courseDetail.findByIdAndUpdate({ _id: id }, { $pull: { trainees: course_detail.trainees[index] } })
//     res.redirect('/staff/CourseDetail');
// }

// // Search Course Name in Course Details
// exports.searchCourseDetail = async(req, res) => {
//     const searchText = req.body.keyword;
//     console.log(searchText);
//     const searchCondition = new RegExp(searchText, 'i')
//     let course_detail = await courseDetail.find({ name: searchCondition });
//     console.log(course_detail);
//     res.render('staffCourseDetail', { _course_detail: course_detail, _keyword: searchText, loginName: req.session.email });
// }