const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema = new Schema({
    username:{ type: String },
    password:{ type: String },
    name: { type: String },
    isAdmin: { type: Boolean }
}, {collection: "users", versionKey: false});

module.exports = mongoose.model("User", userSchema);