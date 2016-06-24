module.exports = function() {
    var mongoose = require("mongoose");

    var PlaceSchema = mongoose.Schema({
        name: {type: String, required: true},
        fid: {type: String, required: true, dropDups: true },
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