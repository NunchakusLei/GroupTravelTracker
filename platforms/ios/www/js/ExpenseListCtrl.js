angular.module('controller.ExpenseListCtrl',[])

/*
 *
 */
    .controller('ExpenseListCtrl',function($scope,$stateParams,$ionicPopup,GroupTravelTracker){

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
        $scope.travel = travelList[currentTravelIndex];
    }

    //    loadTavelList();

    var addExpenseItem = function(inputExpense){
        console.log(inputExpense);
        
        GroupTravelTracker.addExpense(currentTravelIndex,inputExpense);
        //        loadTavelList();
    }

    // popup for adding new expense item
    $scope.showAddExpenseItemPopup = function() {
        $scope.newExpense = {} // select data from popup window

        var myPopup = $ionicPopup.show({
            templateUrl: 'views/addExpenseItemPopup.html',
            title: 'Adding new expense item',
            scope: $scope,
            buttons: [
                { text: 'Cancel' },
                {
                    text: '<b>Save</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        if (!$scope.newExpense.itemName) {
                            //don't allow the user to close unless he enters item name
                            e.preventDefault();
                        } else {
                            addExpenseItem($scope.newExpense);
                        }
                    }
                }
            ]
        });
    };
    
    
})

;