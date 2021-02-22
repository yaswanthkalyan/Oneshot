const express = require('express')
const router = express.Router()
const User = require('../database/models/users')
var passport = require('passport'),
    localStrategy = require('passport-local').Strategy;
// require('../config/passport') (passport)

router.post('/', (req, res) => {
    console.log('user signup');

    const { firstName, lastName, password, confirmPassword,  email } = req.body
    let errors =[];
    // ADD VALIDATION
   
    User.findOne({ email: email}, (err, user) => {
        if (err) {
            console.log('User.js post error: ', err)
        } else if (user) {
            console.log("else if ======")
            res.json({
                error: `Sorry, already a user with the email: ${email}`
            })
        }
        else {
            console.log("+++++added user")
            const newUser = new User({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            })
            console.log(newUser)
            newUser.save((err, savedUser) => {
                if (err) return res.json(err)
                res.json(savedUser)
                console.log("user saved")
            })
        }
    })
    
})

router.post('/login', function (req, res, next) {
        console.log('routes/user.js, login, req.body: ');
        console.log(req.body)
        next()
    },
    passport.authenticate('local'),
    (req, res) => {
        console.log('logged in as ', req.user.firstName);
        var userInfo = {
            name: req.user.firstName
        };
        res.send(userInfo);
    }
);



router.get('/', (req, res, next) => {
    console.log('===== user!!======')
    console.log(req.user)
    if (req.user) {
        console.log("we have a user!")
        res.json({ user: req.user })
    } else {
        console.log("No user yet")
        res.json({ user: null })
    }
})

router.post('/logout', function(req, res){
    req.logOut()
    console.log("Logged out")
    res.send({msg: "user logged out"})
    res.status(200)
})


passport.use(localStrategy)
module.exports = router