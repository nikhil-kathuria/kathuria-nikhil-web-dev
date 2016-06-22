module.exports = function() {
    var mongoose = require("mongoose");

    var PlaceSchema = mongoose.Schema({
        name: {type: String, required: true},
        fid: String,
        category: String,
        address: String,
        city: String,
        state: String,
        country: String,
        lat: Number,
        lng: Number,
        photo: {type : String}

    }, {collection: "project.place"});

    return PlaceSchema;
};