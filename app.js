const express = require('express')
const session = require('express-session')
const { checkUserRole } = require('./databaseHandler')
const {
    requiresLogin,
    requiresAdmin,requireStaff,
    requireTrainer,
    requireTrainee
} = require('./dbLib')
var cookieParser = require('cookie-parser')

const app = express()

app.set('view engine', 'hbs')

app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }))
app.use(session({ secret: '124447yd@@$%%#', cookie: { maxAge: 60000 }, saveUninitialized: false, resave: false }))

app.get('/', requiresLogin, (req, res) => {
    const user = req.session["User"]
    res.render('index', { userInfo: user })
})

app.post('/login', async(req, res) => {
    const name = req.body.txtName
    const pass = req.body.txtPass
    const role = await checkUserRole(name, pass)
    if (role == -1) {
        res.render('login')
    } else if (role == "admin") {
        req.session["admin"] = {
            name: name,
            role: role
        }
        res.redirect('/admin')
    } else if (role == "staff") {
        req.session["staff"] = {
            name: name,
            role: role
        }
        res.redirect('/staff')
    } else if (role == "trainee") {
        req.session["trainee"] = {
            name: name,
            role: role
        }
        res.redirect('/trainee')
    } else if (role == "trainer") {
        req.session["trainer"] = {
            name: name,
            role: role
        }
        res.redirect('/trainer')
    }
})


app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/logout', (req, res) => {
    req.session.destroy()
    res.render('login')
})

// const adminController = require('./controllers/admin')
// app.use('/admin', adminController)

// const staffController = require('./controllers/staff')
// app.use('/staff', staffController)

const trainerController = require('./controllers/trainer')
app.use('/trainer', trainerController)

// const traineeController = require('./controllers/trainee')
// app.use('/trainee', traineeController)






const PORT = process.env.PORT || 5000
app.listen(PORT)
console.log("Server is running! " + PORT)
