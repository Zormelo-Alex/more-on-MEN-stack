const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    password: {
        type: mongoose.SchemaType.String,
        required: true
    },
    email: {
        type: mongoose.SchemaType.String,
        required:true
    },
    createdAt: {
        type: mongoose.SchemaType.Date,
        required: true,
        default: new Date(),
    }
 });
const User = mongoose.model("User", userSchema);


module.exports = User;