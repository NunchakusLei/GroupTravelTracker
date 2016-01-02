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

    // change shared people number
    $scope.chengeSharedPeopleNumber = function(checkBoxStatus) {
        //console.log(checkBoxStatus);
        if(checkBoxStatus){
            $scope.newExpense.sharedPeopleNumber += 1;
        } else {
            $scope.newExpense.sharedPeopleNumber -= 1;
        }
    }
    
    // popup for adding new expense item
    $scope.showAddExpenseItemPopup = function() {
        
        // select data from popup window later
        $scope.newExpense = {
            spendPeopleName:'',
            sharedPeople:[],
            sharedPeopleNumber: $scope.travel.peopleList.length
        }
        
        // initialize the sharedPeople
        for(i=0;i<$scope.travel.peopleList.length;i++){
            var people = {
                name: $scope.travel.peopleList[i],
                checked: true
            }
            $scope.newExpense.sharedPeople.push(people);
        }

        // show popup
        var myPopup = $ionicPopup.show({
            templateUrl: 'views/addExpenseItemPopup.html',
            title: 'Adding a new expense item',
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
    }

    $scope.staticResult = function() {
        $scope.result = [];

        for(i=0;i<$scope.travel.peopleList.length;i++){
            var resultPeople = {
                name: $scope.travel.peopleList[i],
                actualExpense: 0,
                shouldExpense: 0
            };
            $scope.result.push(resultPeople);
        }



        for(i=0;i<$scope.expenseList.length;i++){

//            console.log("expense list",$scope.expenseList[i]);

            for(j=0;j<$scope.result.length;j++){

//                console.log("shared people",$scope.expenseList[i].sharedPeople[j]);

                if ($scope.expenseList[i].sharedPeople[j].checked) {
                    $scope.result[j].shouldExpense += ($scope.expenseList[i].amount)/$scope.expenseList[i].sharedPeopleNumber;
                }
            }
        }

        console.log($scope.result);
    }

})

;