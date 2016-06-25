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
        findPlaceByIds: findPlaceByIds,
        findPlaceByFid: findPlaceByFid,
        addPlaceReview: addPlaceReview,
    };

    return api;


    function addPlaceReview(id, review) {
        return Place.update({ fid: id},
            { $push :
                {reviews: review}
            }
        );
    }

    function findPlaceByIds(ids){
        return Place.find({fid:
            { $in: ids }
        });

    }

    function findPlaceByFid(id){
        return Place.findOne({fid: id });
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
