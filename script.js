const buttonOfCalculation = document.getElementById('start');
const buttonIncomeAdd = document.getElementsByTagName('button')[0];
const buttonExpensesAdd = document.getElementsByTagName('button')[1];
const checkboxOfDeposit = document.querySelector('#deposit-check');
const additionalIncomeItem = document.querySelectorAll('.additional_income-item');
const additionalIncomeItem1 = document.querySelectorAll('.additional_income-item')[0];
const additionalIncomeItem2 = document.querySelectorAll('.additional_income-item')[1];

const budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
const budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
const additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0]; 
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0]; 
const incomePeriodValue = document.getElementsByClassName('income_period-value')[0]; 
const targetMonthValue = document.getElementsByClassName('target_month-value')[0]; 

const salaryAmount = document.querySelector('.salary-amount');
const incomeTitle = document.querySelector('.income-title');
const expensesTitle = document.querySelector('.expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');
let incomeItems = document.querySelectorAll('.income-items')
const additionalExpensesItem= document.querySelector('.additional_expenses-item');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');
let periodAmount = document.querySelector('.period-amount');
const incomeItem = document.querySelectorAll('.income-items');

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
        appData.budget = +salaryAmount.value;

        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth(); // Общий расход в месяц
        appData.getAddExpenses();
        appData.getAddIncome();   
        appData.getBudget(); // Расчет месячного и дневного бюджета
        
        appData.showResult();
    },
    showResult : function() {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = appData.getTargetMonth();
        incomePeriodValue.value = appData.calSavedMoney();
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

        for(let key in appData.income){
            appData.incomeMonth += +appData.income[key];
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

        for (let key in appData.expenses) {
            sum += +appData.expenses[key];
        }

        appData.expensesMonth = sum;  
    },
    getBudget: function(){
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function(){
        return Math.ceil(targetAmount.value/appData.budgetMonth);
    },
    getStatusIncome: function(){
        if (appData.budgetDay >= 1200) {
            return('У вас высокий уровень дохода');
        }
        else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
            return('У вас средний уровень дохода'); 
        }
        else if (appData.budgetDay >= 0 && appData.budgetDay < 600) {
            return('К сожалению у вас уровень дохода ниже среднего'); 
        }
        else {
            return('Что то пошло не так');  
        }
    },
    checkTargetMonth: function(){
        if (appData.getTargetMonth <= 0 ) {
            return('Цель не будет достигнута');
        } 
        else {
            return('Цель будет достигнута за ' + appData.getTargetMonth() + ' месяцев(-а)');
        }  
    },
    getInfoDeposit: function(){
        if(appData.deposit){
            do {
                appData.percentDeposit = prompt('Какой годовой процент?', '10');
            } while (!isNumber(appData.percentDeposit) || appData.percentDeposit.trim() === '');
            do {
                appData.moneyDeposit = prompt('Какая сумма заложена?', '100000');
            } while (!isNumber(appData.moneyDeposit) || appData.moneyDeposit.trim() === '');
        }
    },
    calSavedMoney: function(){
        return appData.budgetMonth * periodSelect.value;
    },
    changeRangeValue: function() {
        console.log('i work');
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

buttonOfCalculation.addEventListener('click', appData.start);

buttonExpensesAdd.addEventListener('click', appData.addExpensesBlock);
buttonIncomeAdd.addEventListener('click', appData.addIncomeBlock);

periodSelect.addEventListener('input', appData.changeRangeValue);

buttonOfCalculation.disabled = true;
salaryAmount.addEventListener('input', appData.checkStartButton);

console.log(periodSelect.value);

