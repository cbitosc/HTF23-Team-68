require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const app = express()
const studentRouter = require("./routes/studentRoutes")
const bookingRouter = require("./routes/bookingRoutes")
const adminRouter = require("./routes/adminRoutes")
const equipmentRouter = require('./routes/equipmentRoute')
const cors = require("cors")
app.use(cors())
// middleware
app.use(express.json())

app.use(studentRouter)
app.use(bookingRouter)
app.use(adminRouter)
app.use(equipmentRouter)

const PORT = 8000
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("DB connected");
        app.listen(PORT, () => {
            console.log("Server running on " + PORT);
        })
    })
    .catch(e => console.log(e))



