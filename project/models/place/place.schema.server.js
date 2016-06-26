module.exports = function() {
    var mongoose = require("mongoose");

    var PlaceSchema = mongoose.Schema({
        name: {type: String, required: true},
        fid: {type: String, index: {unique: true}},
        category: String,
        address: String,
        city: String,
        state: String,
        country: String,
        lat: Number,
        lng: Number,
        photo: {type : String},
        reviews :[
            {
            rating: Number,
            title: String,
            comment: String,
            timestamp: {type: Date, default: Date.now},
            user: {
                _id : {type: mongoose.Schema.Types.ObjectId, ref: 'UserProject'},
                username : String,
                pic: String
                }
            }
        ]

    }, {collection: "project.place"});

    return PlaceSchema;
};