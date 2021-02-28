const mongoose = require("mongoose");
const {Schema} = mongoose;

const testSchema = new Schema({
    test:{ type: String }
}, {collection: "test_collection", versionKey: false});

module.exports = mongoose.model("test", testSchema);