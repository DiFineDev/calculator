function start(){  
    do {
        money = +prompt('Ваш месячный доход?');
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
    expenses: {},
    income: {},
    mission: 100000,
    period: 10,
    asking: function(){
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'); // Дополнительные расходы
            appData.addExpenses = addExpenses.toLowerCase().split(', ');   
            appData.deposit = confirm('Есть ли у вас депозит в банке?');
            for (let i = 0; i < 2; i++) {

                expensesNames = prompt('Введите обязательную статью расходов?');
                do {
                    amount = +prompt('Сколько это будет стоить?');
                } while (!isNumber(amount));

                appData.expenses[expensesNames] = amount;
            }
    },
    getExpensesMonth: function() {
        let sum = 0;

        for (let key in appData.expenses) {
            sum += appData.expenses[key];
        }

        appData.expensesMonth = sum;  
    },
    getBudget: function(){
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function(){
        appData.period = Math.ceil(appData.mission/appData.budgetMonth);
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
        if (appData.period <= 0 ) {
            return('Цель не будет достигнута');
        } 
        else {
            return('Цель будет достигнута за ' + appData.period + ' месяцев(-а)');
        }  
    },

};

appData.asking();  // Ввод даных
appData.getExpensesMonth(); // Общий расход в месяц
appData.getBudget(); // Расчет месячного и дневного бюджета
appData.getTargetMonth(); // Расчёт срока достижения цели

for (let key in appData) {
    console.log(`Наша программа включает в себя данные: ${key} со значением ${appData[key]}`);
}


console.log(`Общий месячный расход составляет ${appData.expensesMonth} руб`);
console.log(appData.checkTargetMonth());
console.log(appData.getStatusIncome());




