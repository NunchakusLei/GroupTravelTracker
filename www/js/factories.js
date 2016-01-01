angular.module('GroupTravelTrackerFactory',[])

    .factory('GroupTravelTracker',function(){
    // local variables
    var travel = {
        place:'',
        expenseList:[]
    };
    var travelList = [];
    var travelListLocalStoragePlace = "travelListLocalStoragePlace";

    return {
        newTravelList: function(){
            new travel;
        },
        newExpense: function(){
            new expense;
        },
        addExpense: function(travel,expense){
            travel.expenseList.push(expense);
        },
        removeExpense: function(travel,expense){
            travel.expenseList.remove(expense);
        },
        addNewTravel: function(place){
            // initialize the new travel
            var travel = {};
            travel.place = place;
            travel.expenseList = [];

            // push new travel into travel list
            travelList.push(travel);
            
            // store the new travel list into local storage
            this.saveToLocal(travelList,travelListLocalStoragePlace);
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
        }
    }
})

;