const mongoose = require('mongoose')

const studentSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true
    }, 
    roll: {
        type: String, 
        required: true
    }, 
    email: {
        type: String, 
        required: true, 
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    }, 
    password: {
        type: String, 
        required: true
    }
})

module.exports = mongoose.model('student', studentSchema)