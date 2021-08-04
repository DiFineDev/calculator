let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'); // Дополнительные расходы
let deposit = confirm('Есть ли у вас депозит в банке?');
let income = 'Фриланс'; // Дополнительные доходы
let mission = 140000; // Необходимая сумма накоплений
let period = 10; // Количесво месяцев
let expensesNames = []; 

start();
let expensesMonth = getExpensesMonth();
let accumulatedMonth = getAccumulatedMonth(money, expensesMonth);
let targetMonth = getTargetMonth(mission,accumulatedMonth);
let budgetDay = Math.floor(accumulatedMonth / 30);

function getAccumulatedMonth(proceeds, expenses){   // Месячный бюджет
    return proceeds - expenses;
}

function getTargetMonth(target, budgetMonth){    // Количество месяцев до цели
    return Math.ceil(target/budgetMonth);
}

function checkTargetMonth() {
    if (targetMonth <= 0 ) {
        return('Цель не будет достигнута');
    } 
    else {
        return('Цель будет достигнута за ' + targetMonth + ' месяцев(-а)');
    } 
}

function getStatusIncome(){
    if (budgetDay >= 1200) {
        return('У вас высокий уровень дохода');
    }
    else if (budgetDay >= 600 && budgetDay < 1200) {
        return('У вас средний уровень дохода'); 
    }
    else if (budgetDay >= 0 && budgetDay < 600) {
        return('К сожалению у вас уровень дохода ниже среднего'); 
    }
    else {
        return('Что то пошло не так');  
    }
}

function start(){  
    do {
        money = +prompt('Ваш месячный доход?');
    } while (!isNumber(money));
}

function getExpensesMonth() {
    let sum = 0;

    for (let i = 0; i < 2; i++) {

        expensesNames[i] = prompt('Введите обязательную статью расходов?');

        do {
            amount = +prompt('Сколько это будет стоить?');
        } while (!isNumber(amount));

        sum += amount;
    }
    return sum;
}

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function showTypeOf(data){
    console.log(data, typeof(data));
}

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
console.log('Расходы за месяц: ' + expensesMonth);
console.log(addExpenses.toLowerCase().split(', '));
console.log(checkTargetMonth());
console.log('Дневной бюджет: ' + budgetDay + ' руб');
console.log(getStatusIncome());


