let money = prompt('Ваш месячный доход?'); // Доход за месяц
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'); // Дополнительные расходы
let deposit = confirm('Есть ли у вас депозит в банке?');
let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = +prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = +prompt('Во сколько это обойдется?');
let income = 'Фриланс'; // Дополнительные доходы
let mission = 140000; // Необходимая сумма накоплений
let period = 10; // Количесво месяцев

let ExpensesMonth = getExpensesMonth(amount1, amount2);
let AccumulatedMonth = getAccumulatedMonth(money, ExpensesMonth);
let TargetMonth = getTargetMonth(mission, AccumulatedMonth);
let budgetDay = Math.floor(AccumulatedMonth / 30);


function getExpensesMonth(cost1, cost2){          // Общие расходы
    return cost1 + cost2;
}

function getAccumulatedMonth(proceeds, expenses){   // Месячный бюджет
    return proceeds - expenses;
}

function getTargetMonth(target, budgetMonth){    // Количество месяцев до цели
    return Math.ceil(target/budgetMonth);
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

function showTypeOf(data){
    console.log(data, typeof(data));
}

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
console.log('Расходы за месяц: ' + getExpensesMonth(amount1, amount2));
console.log(addExpenses.toLowerCase().split(', '));
console.log('Цель будет достигнута за ' + getTargetMonth(mission, AccumulatedMonth) + ' месяцев(-а)');
console.log('Дневной бюджет: ' + budgetDay + ' руб');
console.log(getStatusIncome());


