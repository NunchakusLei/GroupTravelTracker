angular.module('GroupTravelTrackerFactory',[])

    .factory('GroupTravelTracker',function(){
    // local variables
    var travel = {
        place:'',
        expenseList:[],
        totalAmount: 0
    };
    var travelList = [];
    var travelListLocalStoragePlace = "travelListLocalStoragePlace";
    
    var currentTravelIndex = null;

    return {
        newTravelList: function(){
            new travel;
        },
        newExpense: function(){
            new expense;
        },
        addExpense: function(travelId,expense){
            travelList[travelId].expenseList.push(expense);
            travelList[travelId].totalAmount += expense.amount;
            this.saveTrvelList();
        },
        removeExpense: function(travelId,expense){
            travelList[travelId].expenseList.remove(expense);
            travelList[travelId].totalAmount -= expense.amount;
            this.saveTrvelList();
        },
        addNewTravel: function(place){
            // initialize the new travel
            var travel = {};
            travel.place = place;
            travel.expenseList = [];
            travel.totalAmount = 0;

            // push new travel into travel list
            travelList.push(travel);
            
            // store the new travel list into local storage
            this.saveTrvelList();
        },
        getTravelList: function() {
            //window.localStorage.clear(); // delete all travels
            var travelListFromLocal = this.getFromLocal(travelListLocalStoragePlace);
 
            if (travelListFromLocal) {
                travelList = travelListFromLocal;
            } else {
                travelList = [];
            }
            return travelList;
        },
        saveTrvelList: function(){
            this.saveToLocal(travelList,travelListLocalStoragePlace);
        },
        getFromLocal:function(localStoragePlace){
            var content = window.localStorage[localStoragePlace];
            //            console.log(content);
            if(content) {
                return angular.fromJson(content);
            }
        },
        saveToLocal: function(content,localStoragePlace) {
            if(content){
                window.localStorage[localStoragePlace] = angular.toJson(content);
            } else {
                window.localStorage.clear(localStoragePlace);
            }
        },
        setCurrentTravelIndex: function(index) {
            currentTravelIndex = index;
        },
        getCurrentTravelIndex: function(){
            return currentTravelIndex;
        }
    }
})

;