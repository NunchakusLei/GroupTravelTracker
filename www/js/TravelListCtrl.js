angular.module('controller.TravelListCtrl',[])

/*
 *
 */
    .controller('TravelListCtrl',function($scope,GroupTravelTracker,$state){
    loadTravelList = function(){
        $scope.travelList = GroupTravelTracker.getTravelList();
    }

    $scope.startNewTravel = function(){
        GroupTravelTracker.addNewTravel('Travel Name');
//        loadTravelList();
    }
    
    loadTravelList();
    
    $scope.goToExpenseList = function(travel) {
        $state.go('ExpenseList');
    }

})

;