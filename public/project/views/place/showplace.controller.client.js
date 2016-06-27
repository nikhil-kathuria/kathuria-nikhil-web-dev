(function(){
    angular
        .module("PlaceConnect")
        .controller("ShowPlaceController", ShowPlaceController);

    function ShowPlaceController($location, $rootScope, $routeParams, PlaceService) {
        var vm = this;
        vm.submitReview = submitReview;
        vm.deleteReview = deleteReview;
        vm.fid = $routeParams.placeId;
        vm.sessionUser = $rootScope.sessionUser;

        vm.sessionUser ? vm.userId = vm.sessionUser._id : $location.url("/login");

        var mapurl = "https://maps.googleapis.com/maps/api/staticmap?center=LNL&zoom=15&size=500x300&sensor=false&markers=color:red%7Clabel:P%7CLNL";
        
        function init(){
            PlaceService
                .findPlaceByFid(vm.fid)
                .then(function (response) {
                    vm.place = augmentData(response.data);
                    
                }, function(err){
                    vm.error = "Sorry a problem occurred"
                })
        }
        
        init();
        
        
        function augmentData(place) {
            var latlng = place['lat'] + "," + place['lng'];
            var url = mapurl.replace(/LNL/g, latlng);
            place['map'] = url;


            return place;
        }

        function submitReview(review) {
            console.log(review);
            if (review){
            review['user'] = {
                _id : vm.sessionUser._id,
                username : vm.sessionUser.username,
                pic : vm.sessionUser.pic
            };
            PlaceService
                .addPlaceReview(vm.fid, review)
                .then(function (response) {
                    init();
                    
            }, function (err) {
                    vm.error = "Something went wrong";
                });

            } else {
                vm.warning = "Review submission requires atleast one input"
            }
        }


        function deleteReview(rid) {
            PlaceService
                .deleteReview(vm.fid, rid)
                .then(function (response) {
                    init();
                }, function (err) {
                    vm.error = "Something went wrong";
                })

        }


    }
    
    
})();