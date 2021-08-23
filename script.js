'use strict'
const buttonOfCalculation = document.getElementById('start'),
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
      additionalExpensesItem = document.querySelector('.additional_expenses-item'),
      targetAmount = document.querySelector('.target-amount'),
      periodSelect = document.querySelector('.period-select'),
      periodAmount = document.querySelector('.period-amount');

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

class AppData {
    constructor(){
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
    }
    
    start(){
        this.budget = +salaryAmount.value;
        this.getExpInc();
        this.getExpensesMonth(); 
        this.getAddExpInc();
        this.getAddExpInc(additionalExpensesItem, true);
        this.getAddExpInc(additionalIncomeItem, false); 
        this.getBudget(); 
        this.showResult();
        this.blockInputs();
        this.showResetButton();
    }
    reset(){
        this.appDataReset();
        this.clearAllInputs();
        this.unblockInputs();
        this.showStartButton();
        this.deleteIncomeItems();
        this.deleteExpensesItems();
        buttonOfCalculation.disabled = true;
    }
    appDataReset(){
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
    }
    deleteIncomeItems (){
        let incomeItems = document.querySelectorAll('.income-items');
        for (let i = 1; i < incomeItems.length; i++){
            incomeItems[i].remove();
        }
        buttonIncomeAdd.style.display = 'inline-block';
    }
    deleteExpensesItems(){
        let expensesItems = document.querySelectorAll('.expenses-items');
        for (let i = 1; i < expensesItems.length; i++){
            expensesItems[i].remove();
        }
        buttonExpensesAdd.style.display = 'inline-block';
    }
    clearAllInputs (){  
        let allInputs = document.querySelectorAll('input');
    
        allInputs.forEach(element => {
            element.value = '';
        });
        periodSelect.value = '1';
        periodAmount.textContent = periodSelect.value;
    }
    blockInputs (){
        let btnPlus = document.querySelectorAll('.btn_plus'), 
            leftSide = document.querySelector('.data'),
            leftInputs = leftSide.querySelectorAll('[type="text"]');
    
        leftInputs.forEach(element => {
            element.readOnly = true;
        });
    
        btnPlus.forEach(element => {
            element.disabled = true;
        });
        
    }
    unblockInputs (){
        let btnPlus = document.querySelectorAll('.btn_plus'),
            leftSide = document.querySelector('.data'),
            leftInputs = leftSide.querySelectorAll('[type="text"]');
    
        leftInputs.forEach(element => {
            element.readOnly = false;
        });
        btnPlus.forEach(element => {
            element.disabled = false;
        }); 
    }
    showResetButton () {
        buttonOfCalculation.style.display = 'none';
        buttonOfReset.style.display = 'block';
    }
    showStartButton (){
        buttonOfReset.style.display = 'none'; 
        buttonOfCalculation.style.display = 'block';
    }
    showResult  () {
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
    }
    addExpensesBlock (){
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, buttonExpensesAdd);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            buttonExpensesAdd.style.display = 'none';
        }
    }
    addIncomeBlock (){
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, buttonIncomeAdd);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            buttonIncomeAdd.style.display = 'none';
        }
    }
    addExpInc (el) {
        const startStr = el.classList[1].split('_')[0];
        const items = document.querySelectorAll(`.${startStr}-items`);
        const button =  document.querySelector(`.${startStr}_add`);
        const cloneItem = items[0].cloneNode(true);
        items[0].parentNode.insertBefore(cloneItem, button);

        if (items.length === 2) {
            button.style.display = 'none';
        }
    }
    getExpInc () {
        let expensesItems = document.querySelectorAll('.expenses-items'),
            incomeItems = document.querySelectorAll('.income-items');

        const count = item => {
            const startStr = item.className.split('-')[0];
            const itemTitle = item.querySelector(`.${startStr}-title`).value;
            const itemAmount = item.querySelector(`.${startStr}-amount`).value;
            if (itemTitle !== '' && itemAmount !== ''){
                this[startStr][itemTitle] = itemAmount;
            }
        }

        incomeItems.forEach(count);
        expensesItems.forEach(count);

        for(let key in this.income){
            this.incomeMonth += +this.income[key];
        }
    }
    getAddExpInc(addPlace, bool) {
        let addPlaceItem;
        if (bool) {
            addPlaceItem = additionalExpensesItem.value.split(',');
        } else {
            addPlaceItem = additionalIncomeItem;
        }

        addPlaceItem.forEach((item) => {
            let itemValue;
            if (bool) {
                itemValue = item.trim();
                addPlace = this.addExpenses;
            } else {
                itemValue = item.value.trim();
                addPlace = this.addIncome;
            }
            if (itemValue !== '') {
                addPlace.push(itemValue);
            }
        });
    }
    getExpensesMonth () {
        let sum = 0;
    
        for (let key in this.expenses) {
            sum += +this.expenses[key];
        }
    
        this.expensesMonth = sum;  
    }
    getBudget (){
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    }
    getTargetMonth (){
        return Math.ceil(targetAmount.value/this.budgetMonth);
    }
    getInfoDeposit (){
        if(this.deposit){
            do {
                this.percentDeposit = prompt('Какой годовой процент?', '10');
            } while (!isNumber(this.percentDeposit) || this.percentDeposit.trim() === '');
            do {
                this.moneyDeposit = prompt('Какая сумма заложена?', '100000');
            } while (!isNumber(this.moneyDeposit) || this.moneyDeposit.trim() === '');
        }
    }
    calSavedMoney (){
        return this.budgetMonth * periodSelect.value;
    }
    changeRangeValue () {
        periodAmount.innerHTML = periodSelect.value;
    }
    checkStartButton () {
        if (salaryAmount.value === '' || !isNumber(salaryAmount.value)){
            buttonOfCalculation.disabled = true;
        } else {
            buttonOfCalculation.disabled = false; 
        }
    }
    eventsListeners () {

        buttonOfCalculation.addEventListener('click', () => this.start());
        buttonOfReset.addEventListener('click', () => this.reset());
        
        buttonExpensesAdd.addEventListener('click', () => this.addExpInc(event.target));
        buttonIncomeAdd.addEventListener('click', () => this.addExpInc(event.target));
        
        periodSelect.addEventListener('input', () => this.changeRangeValue());
        
        buttonOfCalculation.disabled = true;
        salaryAmount.addEventListener('input', () => this.checkStartButton());
    }

};

const appData = new AppData();

appData.eventsListeners();