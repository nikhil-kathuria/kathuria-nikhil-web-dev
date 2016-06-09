

module.exports = function(){
    var mongoose = require("mongoose");

    var UserSchema = mongoose.Schema({
        username: { type: String, required: true},
        password: String,
        firstname: String,
        lastname: String,
        dob: Date,
        phone: String,
        websites: {type: Array, "default": []},
        dateCreated: {type: Date, default: Date.now}
    }, { collection: "assignment.user" });

    return UserSchema;
};