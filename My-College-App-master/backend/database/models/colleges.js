const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const CollegeSchema = new Schema({
    collegeName: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    costPublic: {
        type: String,
        required: false
    },
    costPrivate: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now()
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    userId: {
        type: String,
        required: true
    }

})

const College = mongoose.model("College", CollegeSchema);

module.exports = College;