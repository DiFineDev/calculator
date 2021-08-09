const buttonOfCalculation = document.getElementById('start');
const buttonIncomeAdd = document.getElementsByTagName('button')[0];
const buttonExpensesAdd = document.getElementsByTagName('button')[1];
const checkboxOfDeposit = document.querySelector('#deposit-check');
const entryFields = document.querySelectorAll('.additional_income-item');

const budgetMonthValue = document.getElementsByClassName('budget_month-value');
const budgetDayValue = document.getElementsByClassName('expenses_month-value');
const additionalIncomeValue = document.getElementsByClassName('additional_income-value'); 
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value'); 
const incomePeriodValue = document.getElementsByClassName('income_period-value'); 
const targetMonthValue = document.getElementsByClassName('target_month-value'); 

const  salaryAmount = document.querySelector('.salary-amount');
const  incomeTitle = document.querySelector('.income-title');
const  incomeAmount = document.querySelector('.income-amount');
const  expensesTitle = document.querySelector('.expenses-title');
const  expensesAmount = document.querySelector('.expenses-amount');
const  additionalExpensesItem= document.querySelector('.additional_expenses-item');
const  targetAmount = document.querySelector('.target-amount');
const  periodSelect = document.querySelector('.period-select');

function start(){  
    do {
        money = prompt('Ваш месячный доход?', '120000');
    } while (!isNumber(money));
}

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

start();

let appData = {
    addExpenses: [],
    addIncome: [],
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    expenses: {},
    income: {}, 
    mission: 100000,
    period: 10,
    asking: function(){
                
        if (confirm('Есть ли у вас дополнительный источник заработка?')) {
            do {
                itemIncome = prompt('Какой у вас дополнительный заработок?', 'Таксую');
            } while (isNumber(itemIncome) || itemIncome.trim() === '');

            do {
                cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', '10000');
            } while (!isNumber(cashIncome));
            appData.income[itemIncome] = cashIncome;
        }

        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Вода, еда, лодка'); // Дополнительные расходы
            appData.addExpenses = addExpenses.toLowerCase().split(', ');   
            appData.deposit = confirm('Есть ли у вас депозит в банке?');
            for (let i = 0; i < 2; i++) {

                do {
                    expensesNames = prompt('Введите обязательную статью расходов?');
                } while (isNumber(expensesNames) || expensesNames.trim() === '');
                do {
                    amount = prompt('Сколько это будет стоить?');
                } while (!isNumber(amount));

                appData.expenses[expensesNames] = amount;
            }
    },
    getExpensesMonth: function() {
        let sum = 0;

        for (let key in appData.expenses) {
            sum += +appData.expenses[key];
        }

        appData.expensesMonth = sum;  
    },
    getBudget: function(){
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function(){
        return Math.ceil(appData.mission/appData.budgetMonth);
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
        return appData.budgetMonth * appData.period;
    }

};


appData.asking();  // Ввод даных
appData.getExpensesMonth(); // Общий расход в месяц
appData.getBudget(); // Расчет месячного и дневного бюджета
appData.getTargetMonth(); // Расчёт срока достижения цели
appData.getInfoDeposit();

for (let key in appData) {
    console.log(`Наша программа включает в себя данные: ${key} со значением ${appData[key]}`);
}



let editAddExpenses = appData.addExpenses.map(function(word) {
    return word[0].toUpperCase() + word.substring(1);
  });

console.log(editAddExpenses.join(', '));

console.log(`Общий месячный расход составляет ${appData.expensesMonth} руб`);
console.log(appData.checkTargetMonth());
console.log(appData.getStatusIncome());
