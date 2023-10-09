const mongoose = require('mongoose')

const equipmentSchema = mongoose.Schema({
    sport: {
        type: String, 
        required: true
    }, 
    quantity: {
        type: Number, 
        required: true
    }
})

module.exports = mongoose.model('equipment', equipmentSchema)