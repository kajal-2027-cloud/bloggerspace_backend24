const mongoose = require("mongoose")
//user - kajal123
// email - kajalg1401@gmail.com
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        // unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
}, {timestamps: true})

module.exports = mongoose.model("User", UserSchema)