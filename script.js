let money = 60000; // Доход за месяц
let income = 'Фриланс'; // Дополнительные доходы
let addExpenses = 'Интернет, такси, коммуналка'; // Дополнительные расходы
let deposit = true;
let mission = 140000; // Необходимая сумма накоплений
let period = 10; // Количесво месяцев


console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission+ ' рублей');

console.log(addExpenses.toLowerCase().split(', '));

let budgetDay = money / 30;
console.log('Дневной бюджет: ' + budgetDay + ' руб');