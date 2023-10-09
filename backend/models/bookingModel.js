const mongoose = require('mongoose')

const bookingSchema = mongoose.Schema({
    studentId: {
        type: mongoose.Types.ObjectId, 
        required: true
    }, 
    sport: {
        type: String, 
        required: true
    }, 
    quantity: {
        type: Number, 
        required: true
    }, 
    timeSlot: {
        startTime: {
            type: Date,
            required: true
        },
        endTime: {
            type: Date,
            required: true
        }
    },
    status: {
        type: Boolean, 
        required: true
    }
}, {timeStamps: true})  // tracks when the booking occured

module.exports = mongoose.model('booking', bookingSchema)