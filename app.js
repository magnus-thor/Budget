// Budget Controller
var budgetController = (function() {

    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var calculateTotal = function(type) {
      var sum = 0;
      data.allItems[type].forEach(function(obj) {
          sum += obj.value;
      });
      data.totals[type] = sum;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };

    return {
        addItem: function(type, des, val) {
            var newItem, ID;
            if (data.allItems[type].length -1 > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }

            data.allItems[type].push(newItem);
            return newItem;
        },

        calculateBudget: function() {

            // 1. Calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');

            // 2. Calculate the budget: income - expenses


            // 3. Calculate the percentage of income that we spent

        }
    }

})
();

// UI Controller
var UIController = (function () {

    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'
    };

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // Will be either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            }
        },

        addListItem: function (obj, type) {
        var html, newHtml, element;

        if (type === 'inc') {
            element = DOMstrings.incomeContainer;
            html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div>' +
                '<div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete">' +
                '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
        } else if (type ==='exp') {
            element = DOMstrings.expensesContainer;
            html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div>' +
                '<div class="right clearfix"><div class="item__value">%value%</div>' +
                '<div class="item__percentage">21%</div><div class="item__delete">' +
                '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
        }

        newHtml = html.replace('%id%', obj.id);
        newHtml = newHtml.replace('%description%', obj.description);
        newHtml = newHtml.replace('%value%', obj.value);

        document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        clearFields: function () {
            var fields, fieldsArray;
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

            fieldsArray = Array.prototype.slice.call(fields);

            fieldsArray.forEach(function(obj, index, array) {
                obj.value = "";
            });
            fieldsArray[0].focus();
        },

        getDomstrings: function () {
            return DOMstrings;
        }
    }

})();


// Controller
var controller = (function (budgetCtrl, UICtrl) {

    var setupEventListeners = function () {
        var DOM = UICtrl.getDomstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }

        })
    };

    var updateBudget = function() {

        // 1. Calculate budget

        // 2. Return budget

        // 3. Display the budget on the UI
    };

    var ctrlAddItem = function() {
        var input, newItem;
        // 1. Get the field input data
        input = UICtrl.getInput();

        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            // 2. Add the item to the budget
            newItem = budgetController.addItem(input.type, input.description, input.value);

            // 3. Add the item to the UI
            UICtrl.addListItem(newItem, input.type);

            // 4. clear fields
            UICtrl.clearFields();

            // 5. Calculate and update the budget
            updateBudget();
        }
    };


    return {
        init: function () {
            console.log('Application has started.');
            setupEventListeners();
        }
    }

})(budgetController, UIController);

controller.init();