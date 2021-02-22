const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

UserSchema.methods ={
    checkPassword: function(inputPassword) {
        return bcrypt.compareSync(inputPassword, this.password);
    },
    hashPassword: function(plaintextPassword) {
        return bcrypt.hashSync(plaintextPassword, 10)
    }
}

UserSchema.pre('save', function(next){
    if(!this.password) {
        console.log("===== No Password =======")
        next()
    } else {
        console.log('adding hashed password')
        this.password = this.hashPassword(this.password)
        next()
    }
})

const User = mongoose.model("User", UserSchema);

module.exports = User;