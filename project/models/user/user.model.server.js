
module.exports = function() {

    var mongoose = require('mongoose');
    var UserSchemaProject = require("./user.schema.server.js")();
    var UserProject = mongoose.model("UserProject", UserSchemaProject);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByFacebookId: findUserByFacebookId,
        findUserByGoogleId : findUserByGoogleId,
        updateProfilePic: updateProfilePic,
        findPlaceIds: findPlaceIds,
        addPlace: addPlace,
        removePlace: removePlace,
        getAllUsers: getAllUsers,
        deleteUserPlace: deleteUserPlace
    };

    return api;

    function getAllUsers() {
        return UserProject.find();
    }

    function deleteUserPlace(fid, userId) {
        return UserProject.update({ _id: userId},
            { $pull :
                {
                    places: fid
                }

            });

    }

    function addPlace(userId, fid){
        return UserProject.update({_id: userId},
            { $addToSet:
                {places: fid}}
        );
    }

    function removePlace(userId, fid) {
        return UserProject.update( {_id: userId},
            { $pull:
            {places:  fid} } );
    }

    function updateUser(userId, user) {
        delete user._id;
        return UserProject
            .update({_id: userId },{
                $set: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                }
            });
    }
    
    function updateProfilePic(userId, picurl){
        return UserProject
            .update({_id: userId },{
                $set: {
                    pic: picurl
                }
            });
    }

    
    function findPlaceIds(userId){
        
    }

    function deleteUser(userId) {
        return UserProject.remove({_id: userId});
    }

    function findUserByCredentials(username, password) {
        return UserProject.findOne({username: username, password: password});
    }

    function findUserById(userId) {
        return UserProject.findById(userId);
    }

    function findUserByUsername(username){
        return UserProject.findOne({username: username});
    }

    function createUser(user) {
        return UserProject.create(user);
    }

    function findUserByFacebookId(facebookId) {
        return UserProject.findOne({'facebook.id': facebookId});
    }

    function findUserByGoogleId(googleId) {
        return UserProject.findOne({'google.id': googleId});
    }
};