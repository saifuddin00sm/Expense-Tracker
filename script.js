const balance = document.getElementById('balance');
const mone_plus = document.getElementById('money-plus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const money_minus = document.getElementById('money-minus');
const amount = document.getElementById('amount');
const formControl = document.querySelector('.form-control');



// const dummyTransactionns = [
//     { id: 1, text: 'Flower', amount: -20 },
//     { id: 2, text: 'Salary', amount: 300 },
//     { id: 3, text: 'Book', amount: -10 },
//     { id: 4, text: 'Camera', amount: 150 }
// ];
const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'))


let transactions =
    localStorage.getItem('transactions') !== null ? localStorageTransactions : [];


// update local storage function

function updaateLocalstorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}


// Add transation to DOM List
function addTransactionDOM(transaction) {
    // Get sign
    const sign = transaction.amount < 0 ? '-' : '+';
    const item = document.createElement('li');

    //   Add class based on value

    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span> <button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">x</button> 
  `;

    list.appendChild(item);
}

// init app

function init() {
    list.innerHTML = '';


    transactions.forEach(addTransactionDOM)

    updateValues();
}

init();

// Update the balance, income and expense

function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);

    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2)

    const income = amounts
        .filter(item => item > 0)

    .reduce((acc, item) => (acc += item), 0)
        .toFixed(2)


    const expense = (
        amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1
    ).toFixed(2)

    balance.innerText = `$${total}`;
    mone_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;
}

// event listener for submit

form.addEventListener('submit', addTransaction);

// Add transaction 
function addTransaction(e) {
    e.preventDefault();

    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please fil the inputs')
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value
        };

        transactions.push(transaction);

        addTransactionDOM(transaction);

        updateValues();

        updaateLocalstorage();

        text.value = '';
        amount.value = '';
    }
};

// Generate ID function
function generateID() {
    return Math.floor(Math.random() * 100000000);
}



// remove transaction by id

function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);


    updaateLocalstorage()

    init();
}