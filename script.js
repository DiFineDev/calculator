let money = prompt('Ваш месячный доход?'); // Доход за месяц
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'); // Дополнительные расходы
let deposit = confirm('Есть ли у вас депозит в банке?');
let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = prompt('Во сколько это обойдется?');
let income = 'Фриланс'; // Дополнительные доходы
let mission = 140000; // Необходимая сумма накоплений
let period = 10; // Количесво месяцев
let budgetMonth = money - amount1 - amount2;
let budgetDay = Math.floor(budgetMonth / 30);

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission+ ' рублей');
console.log(addExpenses.toLowerCase().split(', '));
console.log('Месячный бюджет: ' + budgetMonth);
console.log('Цель будет достигнута за ' + Math.ceil(mission/budgetMonth) + ' месяцев(-а)');
console.log('Дневной бюджет: ' + budgetDay + ' руб');

if (budgetDay >= 1200) {
    console.log('У вас высокий уровень дохода');
}
else if (budgetDay >= 600 && budgetDay < 1200) {
    console.log('У вас средний уровень дохода'); 
}
else if (budgetDay >= 0 && budgetDay < 600) {
    console.log('К сожалению у вас уровень дохода ниже среднего'); 
}
else {
    console.log('Что то пошло не так');  
}