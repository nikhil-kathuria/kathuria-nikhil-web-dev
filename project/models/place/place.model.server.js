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
        deletePlaceReview:deletePlaceReview,
        findAllPlaces: findAllPlaces,
    };

    return api;

    function findAllPlaces() {
        return Place.find();
    }
    
    
    function deletePlaceReview(id, rid) {
        return Place.update({fid: id},
            { $pull :
                {
                    reviews: { _id: rid}
                }
        });
    }


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

    function deletePlace(id) {
        return Place.remove({fid: id});

    }

    function findPlaceById(placeId) {
        return Place.findById(placeId);

    }
};
