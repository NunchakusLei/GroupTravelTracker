angular.module('controller.PeopleManagementCtrl',[])

/*
 *
 */
    .controller('PeopleManagementCtrl',function($scope,$stateParams,$state,$ionicPopup,GroupTravelTracker){

    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        loadTavelList();
        //console.log($scope.peopleList);
    })

    // local variables
    var currentTravelIndex = $stateParams.travelId; // get the index of current travel
    var travelList;

    // reload travel list
    loadTavelList = function(){
        travelList = GroupTravelTracker.getTravelList(); // get all the travels

        // using the index to get the current travel's expense list
        $scope.peopleList = travelList[currentTravelIndex].peopleList;
        $scope.travel = travelList[currentTravelIndex];
        
        //console.log($scope.peopleList);
    }

    var addNewPerson = function(newPerson) {
        GroupTravelTracker.addPeople(currentTravelIndex,newPerson);
    }
    
    $scope.deletePeople = function(people) {
        //console.log(people);
        
        GroupTravelTracker.removePeople(currentTravelIndex,people);
    }

    $scope.showAddPeoplePopup = function() {
        // select data from popup window later
        $scope.newPerson = {};

        // show popup
        var myPopup = $ionicPopup.show({
            templateUrl: 'views/addPeoplePopup.html',
            title: 'Adding a new person',
            scope: $scope,
            buttons: [
                { text: 'Cancel' },
                {
                    text: '<b>Add person</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        if (!$scope.newPerson.name) {
                            //don't allow the user to close unless he enters person's name
                            e.preventDefault();
                        } else {
                            addNewPerson($scope.newPerson.name);
                        }
                    }
                }
            ]
        });
    }

})

;