const LocalStrategy = require('passport-local')
const strategy = new LocalStrategy(
    {
        usernameField: 'email'
    },
    function(email, password, done) {
        User.findOne({email: email}, (err, user) =>{
            if(err){
                return done(err);
            }
            if(!user){
                return done(null, false, {message: "Incorrect email"})
            }
            if(!user.checkPassword(password)) {
                return done(null, false, {message: "Invalid Password"})
            }
            return done(null, user)
        })
    }
)

module.exports =strategy;