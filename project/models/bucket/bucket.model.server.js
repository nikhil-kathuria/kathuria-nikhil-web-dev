module.exports = function() {

    var mongoose = require('mongoose');
    var BucketSchema = require("./bucket.schema.server")();
    var Bucket = mongoose.model("Bucket", BucketSchema);


    var api = {
        createBucket: createBucket,
        updateBucket: updateBucket,
        deleteBucket: deleteBucket,
        findBucketById: findBucketById,
        findBucketByName: findBucketByName

    };

    return api;

    function createBucket(bucket) {
        return Bucket.create(bucket);
    }

    function updateBucket(bucket, bucketId) {
        delete bucket._id;

        return Bucket.update({_id: bucketId}, {
            $set: {
                type: bucket.type
            }
        });
    }

    function deleteBucket(bucketId) {
        return Bucket.remove({_id : bucketId });
    }

    function findBucketById(bucketId) {
        return Bucket.findById(bucketId);
    }

    function findBucketByName(name){
        return Bucket.findOne({ name: name });
    }
    




};