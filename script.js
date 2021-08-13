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
    additionalExpensesItem= document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount');

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

let appData = {
    addExpenses: [],
    addIncome: [],
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    deposit: false,
    expenses: {},
    expensesMonth: 0,
    moneyDeposit: 0,
    percentDeposit: 0,
    income: {},
    incomeMonth: 0, 
    start: function (){  
        this.budget = +salaryAmount.value;
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth(); // Общий расход в месяц
        this.getAddExpenses();
        this.getAddIncome();   
        this.getBudget(); // Расчет месячного и дневного бюджета
        this.showResult();
        this.blockInputs();
        this.showResetButton();
    },
    reset: function(){
        appData.appDataReset();
        appData.clearAllInputs();
        appData.unblockInputs();
        appData.showStartButton();
        appData.deleteIncomeItems();
        appData.deleteExpensesItems();
        buttonOfCalculation.disabled = true;
    },
    appDataReset: function(){
        appData.addExpenses = [],
        appData.addIncome = [],
        appData.budget = 0,
        appData.budgetDay = 0,
        appData.budgetMonth = 0,
        appData.deposit = false,
        appData.expenses = {},
        appData.expensesMonth = 0,
        appData.moneyDeposit = 0,
        appData.percentDeposit = 0,
        appData.income = {},
        appData.incomeMonth = 0;  
    },
    deleteIncomeItems: function(){
        let incomeItems = document.querySelectorAll('.income-items');
        for (let i = 1; i < incomeItems.length; i++){
            incomeItems[i].remove();
        }
        buttonIncomeAdd.style.display = 'inline-block';
    },
    deleteExpensesItems: function(){
        let expensesItems = document.querySelectorAll('.expenses-items');
        for (let i = 1; i < expensesItems.length; i++){
            expensesItems[i].remove();
        }
        buttonExpensesAdd.style.display = 'inline-block';
    },
    clearAllInputs: function(){  
        let allInputs = document.querySelectorAll('input');

        allInputs.forEach(element => {
            element.value = '';
        });
        periodSelect.value = '1';
        periodAmount.textContent = periodSelect.value;
    },
    blockInputs: function(){
        let btnPlus = document.querySelectorAll('.btn_plus'), 
            leftSide = document.querySelector('.data'),
            leftInputs = leftSide.querySelectorAll('[type="text"]');

        leftInputs.forEach(element => {
            element.readOnly = true;
        });

        btnPlus.forEach(element => {
            element.disabled = true;
        });
        
    },
    unblockInputs: function(){
        let btnPlus = document.querySelectorAll('.btn_plus'),
            leftSide = document.querySelector('.data'),
            leftInputs = leftSide.querySelectorAll('[type="text"]');

        leftInputs.forEach(element => {
            element.readOnly = false;
        });
        btnPlus.forEach(element => {
            element.disabled = false;
        }); 
    },
    showResetButton: function() {
        buttonOfCalculation.style.display = 'none';
        buttonOfReset.style.display = 'block';
    },
    showStartButton: function(){
        buttonOfReset.style.display = 'none'; 
        buttonOfCalculation.style.display = 'block';
    },
    showResult : function() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calSavedMoney();
        periodSelect.addEventListener('input', function() {
            incomePeriodValue.value = appData.calSavedMoney(); 
        });

        
    },
    addExpensesBlock: function(){
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, buttonExpensesAdd);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            buttonExpensesAdd.style.display = 'none';
        }
    },
    getExpenses: function() {
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== ''){
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },
    addIncomeBlock: function(){
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, buttonIncomeAdd);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            buttonIncomeAdd.style.display = 'none';
        }
    },
    getIncome: function() {
        incomeItems.forEach(function(item){
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== ''){
                appData.income[itemIncome] = cashIncome;
            }
        });

        for(let key in this.income){
            this.incomeMonth += +this.income[key];
        }

    },
    getAddExpenses: function() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if (item !== ''){
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function() {
        additionalIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if(itemValue !== ''){
                appData.addIncome.push(itemValue);
            }
        });
    },
    getExpensesMonth: function() {
        let sum = 0;

        for (let key in this.expenses) {
            sum += +this.expenses[key];
        }

        this.expensesMonth = sum;  
    },
    getBudget: function(){
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    },
    getTargetMonth: function(){
        return Math.ceil(targetAmount.value/this.budgetMonth);
    },
    getInfoDeposit: function(){
        if(this.deposit){
            do {
                this.percentDeposit = prompt('Какой годовой процент?', '10');
            } while (!isNumber(this.percentDeposit) || this.percentDeposit.trim() === '');
            do {
                this.moneyDeposit = prompt('Какая сумма заложена?', '100000');
            } while (!isNumber(this.moneyDeposit) || this.moneyDeposit.trim() === '');
        }
    },
    calSavedMoney: function(){
        return this.budgetMonth * periodSelect.value;
    },
    changeRangeValue: function() {
        periodAmount.innerHTML = periodSelect.value;
    },
    checkStartButton: function() {
        if (salaryAmount.value === '' || !isNumber(salaryAmount.value)){
            buttonOfCalculation.disabled = true;
        } else {
            buttonOfCalculation.disabled = false; 
        }
    },
    

};

let start = appData.start.bind(appData);


buttonOfCalculation.addEventListener('click', start);
buttonOfReset.addEventListener('click', appData.reset);

buttonExpensesAdd.addEventListener('click', appData.addExpensesBlock);
buttonIncomeAdd.addEventListener('click', appData.addIncomeBlock);

periodSelect.addEventListener('input', appData.changeRangeValue);

buttonOfCalculation.disabled = true;
salaryAmount.addEventListener('input', appData.checkStartButton);


