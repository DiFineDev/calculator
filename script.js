let buttonOfCalculation = document.getElementById('start'),
    buttonOfReset = document.getElementById('cancel'),
    buttonIncomeAdd = document.getElementsByTagName('button')[0],
    buttonExpensesAdd = document.getElementsByTagName('button')[1],
    checkboxOfDeposit = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    additionalIncomeItem1 = document.querySelectorAll('.additional_income-item')[0],
    additionalIncomeItem2 = document.querySelectorAll('.additional_income-item')[1],
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount');

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

const AppData = function () {
    this.addExpenses = [];
    this.addIncome = [];
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.deposit = false;
    this.expenses = {};
    this.expensesMonth = 0;
    this.moneyDeposit = 0;
    this.percentDeposit = 0;
    this.income = {};
    this.incomeMonth = 0;
};

AppData.prototype.start = function (){  
    this.budget = +salaryAmount.value;
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth(); 
    this.getAddExpenses();
    this.getAddIncome();   
    this.getBudget(); 
    this.showResult();
    this.blockInputs();
    this.showResetButton();
};
AppData.prototype.reset = function(){
    this.appDataReset();
    this.clearAllInputs();
    this.unblockInputs();
    this.showStartButton();
    this.deleteIncomeItems();
    this.deleteExpensesItems();
    buttonOfCalculation.disabled = true;
};
AppData.prototype.appDataReset = function(){
    this.addExpenses = [],
    this.addIncome = [],
    this.budget = 0,
    this.budgetDay = 0,
    this.budgetMonth = 0,
    this.deposit = false,
    this.expenses = {},
    this.expensesMonth = 0,
    this.moneyDeposit = 0,
    this.percentDeposit = 0,
    this.income = {},
    this.incomeMonth = 0;  
};
AppData.prototype.deleteIncomeItems = function(){
    let incomeItems = document.querySelectorAll('.income-items');
    for (let i = 1; i < incomeItems.length; i++){
        incomeItems[i].remove();
    }
    buttonIncomeAdd.style.display = 'inline-block';
};
AppData.prototype.deleteExpensesItems = function(){
    let expensesItems = document.querySelectorAll('.expenses-items');
    for (let i = 1; i < expensesItems.length; i++){
        expensesItems[i].remove();
    }
    buttonExpensesAdd.style.display = 'inline-block';
};
AppData.prototype.clearAllInputs = function(){  
    let allInputs = document.querySelectorAll('input');

    allInputs.forEach(element => {
        element.value = '';
    });
    periodSelect.value = '1';
    periodAmount.textContent = periodSelect.value;
};
AppData.prototype.blockInputs = function(){
    let btnPlus = document.querySelectorAll('.btn_plus'), 
        leftSide = document.querySelector('.data'),
        leftInputs = leftSide.querySelectorAll('[type="text"]');

    leftInputs.forEach(element => {
        element.readOnly = true;
    });

    btnPlus.forEach(element => {
        element.disabled = true;
    });
    
};
AppData.prototype.unblockInputs = function(){
    let btnPlus = document.querySelectorAll('.btn_plus'),
        leftSide = document.querySelector('.data'),
        leftInputs = leftSide.querySelectorAll('[type="text"]');

    leftInputs.forEach(element => {
        element.readOnly = false;
    });
    btnPlus.forEach(element => {
        element.disabled = false;
    }); 
};
AppData.prototype.showResetButton = function() {
    buttonOfCalculation.style.display = 'none';
    buttonOfReset.style.display = 'block';
};
AppData.prototype.showStartButton = function(){
    buttonOfReset.style.display = 'none'; 
    buttonOfCalculation.style.display = 'block';
};
AppData.prototype.showResult  = function() {
    const _this = this;
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calSavedMoney();
    periodSelect.addEventListener('input', function() {
        incomePeriodValue.value = _this.calSavedMoney(); 
    });
};
AppData.prototype.addExpensesBlock = function(){
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, buttonExpensesAdd);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
        buttonExpensesAdd.style.display = 'none';
    }
};
AppData.prototype.getExpenses = function() {
    const _this = this;
    expensesItems.forEach(function(item){
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== ''){
            _this.expenses[itemExpenses] = cashExpenses;
        }
    });
};
AppData.prototype.addIncomeBlock = function(){
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, buttonIncomeAdd);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
        buttonIncomeAdd.style.display = 'none';
    }
};
AppData.prototype.getIncome = function() {
    const _this = this;
    incomeItems.forEach(function(item){
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if (itemIncome !== '' && cashIncome !== ''){
            _this.income[itemIncome] = cashIncome;
        }
    });

    for(let key in this.income){
        this.incomeMonth += +this.income[key];
    }

};
AppData.prototype.getAddExpenses = function() {
    const _this = this;
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item){
        item = item.trim();
        if (item !== ''){
            _this.addExpenses.push(item);
        }
    });
};
AppData.prototype.getAddIncome = function() {
    const _this = this;
    additionalIncomeItem.forEach(function(item){
        let itemValue = item.value.trim();
        if(itemValue !== ''){
            _this.addIncome.push(itemValue);
        }
    });
};
AppData.prototype.getExpensesMonth = function() {
    let sum = 0;

    for (let key in this.expenses) {
        sum += +this.expenses[key];
    }

    this.expensesMonth = sum;  
};
AppData.prototype.getBudget = function(){
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
};
AppData.prototype.getTargetMonth = function(){
    return Math.ceil(targetAmount.value/this.budgetMonth);
};
AppData.prototype.getInfoDeposit = function(){
    if(this.deposit){
        do {
            this.percentDeposit = prompt('Какой годовой процент?', '10');
        } while (!isNumber(this.percentDeposit) || this.percentDeposit.trim() === '');
        do {
            this.moneyDeposit = prompt('Какая сумма заложена?', '100000');
        } while (!isNumber(this.moneyDeposit) || this.moneyDeposit.trim() === '');
    }
};
AppData.prototype.calSavedMoney = function(){
    return this.budgetMonth * periodSelect.value;
};
AppData.prototype.changeRangeValue = function() {
    periodAmount.innerHTML = periodSelect.value;
};
AppData.prototype.checkStartButton = function() {
    if (salaryAmount.value === '' || !isNumber(salaryAmount.value)){
        buttonOfCalculation.disabled = true;
    } else {
        buttonOfCalculation.disabled = false; 
    }
};
AppData.prototype.eventsListeners = function() {

    let start = appData.start.bind(appData);
        reset = appData.reset.bind(appData),
        addExpensesBlock = appData.addExpensesBlock.bind(appData),
        addIncomeBlock = appData.addIncomeBlock.bind(appData),
        changeRangeValue = appData.changeRangeValue.bind(appData),
        checkStartButton = appData.checkStartButton.bind(appData),

    buttonOfCalculation.addEventListener('click', start);
    buttonOfReset.addEventListener('click', reset);
    
    buttonExpensesAdd.addEventListener('click', addExpensesBlock);
    buttonIncomeAdd.addEventListener('click', addIncomeBlock);
    
    periodSelect.addEventListener('input', changeRangeValue);
    
    buttonOfCalculation.disabled = true;
    salaryAmount.addEventListener('input', checkStartButton);
};


const appData = new AppData();

appData.eventsListeners();
