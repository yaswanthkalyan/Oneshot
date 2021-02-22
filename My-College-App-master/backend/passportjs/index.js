var passport = require('passport'),
    LocalStrategey = require('passport-local').Strategy;


const User = require('../database/models/users');


// const user = {email: "m@j.com", password:"123456"}

passport.serializeUser((user, done =>{
    console.log("****Serialze called*****")
    console.log(user);
    console.log("________")
    done(null, {_id: user._id})
}))

passport.deserializeUser((id, done) => {
    console.log("****Deserialized called******")
    User.findOne(
        {_id: id},
        'email',
        (err, user) => {
            console.log("Deserixe user, user: ")
            console.log(user)
            console.log("------------")
            done(null, user)
        }
    )
})

passport.use(LocalStrategey)
module.exports =passport