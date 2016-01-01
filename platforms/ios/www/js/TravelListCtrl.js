angular.module('controller.TravelListCtrl',[])

/*
 *
 */
    .controller('TravelListCtrl',function($scope,GroupTravelTracker,$state){
    
    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        loadTravelList();
    })

    loadTravelList = function(){
        $scope.travelList = GroupTravelTracker.getTravelList();
    }
    
//    loadTravelList();

    $scope.startNewTravel = function(){
        GroupTravelTracker.addNewTravel('Travel Name');
//        loadTravelList();
    }
    
    $scope.goToExpenseList = function(travel) {
        var travelIndex = $scope.travelList.indexOf(travel);
        GroupTravelTracker.setCurrentTravelIndex(travelIndex);
        $state.go('ExpenseList',{travelId:travelIndex});
    }

})

;