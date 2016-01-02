angular.module('controller.TravelListCtrl',[])

/*
 *
 */
    .controller('TravelListCtrl',function($scope,$ionicPopup,GroupTravelTracker,$state){

    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        loadTravelList();
    })

    loadTravelList = function(){
        $scope.travelList = GroupTravelTracker.getTravelList();
    }

    //    loadTravelList();

    $scope.startNewTravel = function(newTravel){
        GroupTravelTracker.addNewTravel(newTravel.place,newTravel.peopleList);
        //        loadTravelList();
    }

    $scope.goToExpenseList = function(travel) {
        var travelIndex = $scope.travelList.indexOf(travel);
        //GroupTravelTracker.setCurrentTravelIndex(travelIndex);
        $state.go('ExpenseList',{travelId:travelIndex});
    }

    $scope.showStartNewTravelPopup = function() {
        // select data from popup window later
        $scope.newTravel = {
            place:'',
            peopleList: ["Me","You"]
        }

        // show popup
        var myPopup = $ionicPopup.show({
            templateUrl: 'views/startNewTravelPopup.html',
            title: 'Adding a new travel',
            scope: $scope,
            buttons: [
                { text: 'Cancel' },
                {
                    text: '<b>Next</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        if (!$scope.newTravel.place || $scope.newTravel.peopleList.length==0) {
                            //don't allow the user to close unless he enters item name or not people
                            e.preventDefault();
                        } else {
                            $scope.startNewTravel($scope.newTravel);

                            var travelIndex = $scope.travelList.length - 1;
                            $state.go('PeopleManagement',{travelId:travelIndex});
                        }
                    }
                }
            ]
        });
    }

})

;