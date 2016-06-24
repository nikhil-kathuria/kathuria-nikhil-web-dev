module.exports = function() {

    var mongoose = require('mongoose');
    var PlaceSchema = require("./place.schema.server.js")();
    var Place = mongoose.model("Place", PlaceSchema);

    var api = {
        createPlace: createPlace,
        updatePlace: updatePlace,
        deletePlace: deletePlace,
        findPlaceById: findPlaceById,
        updatePlace: updatePlace,
        findPlaceByIds: findPlaceByIds
    };

    return api;

    function findPlaceByIds(ids){
        var obj = Place.find({fid:
            { $in: ids }
        });
        return obj;
    }

    function createPlace(place) {
        return Place.create(place);
    }

    function updatePlace(placeId, place) {
        delete place._id;
        return Place
            .update({_id: placeId },{
                $set: {
                    category : place.category,
                    photo : place.photo
                }
            });
    }

    function deletePlace(placeId) {
        return Place.remove({_id: placeId});

    }

    function findPlaceById(placeId) {
        return Place.findById(placeId);

    }
};
