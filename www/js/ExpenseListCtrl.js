angular.module('controller.ExpenseListCtrl',[])

/*
 *
 */
    .controller('ExpenseListCtrl',function($scope,$stateParams,GroupTravelTracker){

    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        loadTavelList();
    })

    // local variables
    var currentTravelIndex = $stateParams.travelId; // get the index of current travel
    var travelList;

    // reload travel list
    loadTavelList = function(){
        travelList = GroupTravelTracker.getTravelList(); // get all the travels
        
        // using the index to get the current travel's expense list
        $scope.expenseList = travelList[currentTravelIndex].expenseList;
    }
    
//    loadTavelList();

    $scope.addExpenseItem = function(){
        var expense = {};
        expense.itemName = "New expense";
        expense.amount = 60;
        
//        travelList[currentTravelIndex].totalAmount += expense.amount;
        
        GroupTravelTracker.addExpense(currentTravelIndex,expense);
//        loadTavelList();
    }

})

;