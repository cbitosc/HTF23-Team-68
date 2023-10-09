const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    name: {
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
        required: true,
        minlength: 6
    }
})

module.exports = mongoose.model('admin', adminSchema)