angular.module('GroupTravelTrackerFactory',[])

    .factory('GroupTravelTracker',function(){
    // local variables
    var travel = {
        place:'',
        expenseList:[],
        dStart:'',
        dEnd:'',
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
        addExpense: function(travelId,inputExpense){
            var newExpense = {
                itemName: "(New expense)",
                amount: 0
            };

            // putting data into newExpense
            newExpense.itemName = inputExpense.itemName;
            newExpense.sharedPeople = inputExpense.sharedPeople;
            newExpense.sharedPeopleNumber = inputExpense.sharedPeopleNumber;
            newExpense.payer = inputExpense.payer;
            if (inputExpense.amount) {
                newExpense.amount = inputExpense.amount;
            }

            travelList[travelId].expenseList.push(newExpense);
            travelList[travelId].totalAmount += newExpense.amount;
            this.saveTrvelList();
        },
        removeExpense: function(travelId,expense){
            travelList[travelId].expenseList.remove(expense); // has problem!!!
            travelList[travelId].totalAmount -= expense.amount;
            this.saveTrvelList();
        },
        addPeople: function(travelId,person) {
            travelList[travelId].peopleList.push(person);
            this.saveTrvelList();
        },
        removePeople: function(travelId,person) {
            var personIndex = travelList[travelId].peopleList.indexOf(person);
            
            travelList[travelId].peopleList.splice(personIndex,1);
            this.saveTrvelList();
        },
        addNewTravel: function(place,peopleList,dStart,dEnd){
            // initialize the new travel
            var travel = {};
            travel.place = place;
            travel.expenseList = [];
            travel.totalAmount = 0;
            travel.peopleList = peopleList;
            travel.dStart = dStart;
            travel.dEnd = dEnd;

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