const express = require('express')
const {
    insertObject,getDB
} = require('../databaseHandler')
const {
    requireStaff
} = require('../dbLib')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('trainerIndex')
})

//cham diem
router.post('/MarkTrainee',async (req,res)=>{
    const name = req.body.txtName
    const grade = req.body.txtGrade
    const grade_trainee = {
        name: name,
        grade: grade
    }
    await insertObject("traineegrade",grade_trainee)
    res.redirect('/trainer/trainerMarkTrainee')

})
router.get('/trainerMarkTrainee',(req,res)=>{
    res.render('trainerMarkTrainee')
})
///




module.exports = router;
