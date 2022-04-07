'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  movementsDate: [
    new Date(2022, 3, 7, 3, 10, 32),
    new Date(2022, 3, 6, 1, 17, 43),
    new Date(2021, 11, 18, 2, 11, 55),
    new Date(2022, 4, 1, 1, 27, 10),
    new Date(2021, 11, 20, 1, 33, 23),
    new Date(2021, 11, 21, 1, 45, 40),
    new Date(2021, 11, 18, 22, 37, 5),
    new Date(2021, 11, 18, 11, 18, 9)
  ],
  interestRate: 1.2, // %
  pin: 1111,
  locale: 'en-US',
  currency: 'USD',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  movementsDate: [
    new Date(2022, 3, 7, 3, 10, 32),
    new Date(2022, 4, 6, 1, 17, 43),
    new Date(2021, 11, 18, 2, 11, 55),
    new Date(2022, 4, 1, 1, 27, 10),
    new Date(2021, 11, 20, 1, 33, 23),
    new Date(2021, 11, 21, 1, 45, 40),
    new Date(2021, 11, 18, 22, 37, 5),
    new Date(2021, 11, 18, 11, 18, 9)
  ],
  interestRate: 1.5,
  pin: 2222,
  locale: 'CA',
  currency: 'CAD',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  movementsDate: [
    new Date(2022, 3, 7, 3, 10, 32),
    new Date(2022, 4, 6, 1, 17, 43),
    new Date(2021, 11, 18, 2, 11, 55),
    new Date(2022, 4, 1, 1, 27, 10),
    new Date(2021, 11, 20, 1, 33, 23),
    new Date(2021, 11, 21, 1, 45, 40),
    new Date(2021, 11, 18, 22, 37, 5),
    new Date(2021, 11, 18, 11, 18, 9)
  ],
  interestRate: 0.7,
  pin: 3333,
  locale: 'en-GB',
  currency: 'GBP',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  movementsDate: [
    new Date(2022, 3, 7, 3, 10, 32),
    new Date(2022, 4, 6, 1, 17, 43),
    new Date(2021, 11, 18, 2, 11, 55),
    new Date(2022, 4, 1, 1, 27, 10),
    new Date(2021, 11, 20, 1, 33, 23),
  ],
  interestRate: 1,
  pin: 4444,
  locale: 'AU',
  currency: 'AUD',
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const formatMomentDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) => Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yersteday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();

  return new Intl.DateTimeFormat(locale).format(date);
};

const formatMovement = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};


const displayMovements = function (acc, sort = false) {

  containerMovements.innerHTML = '';

  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

  movs.forEach((mov, i) => {

    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(acc.movementsDate[i]);
    const displayDate = formatMomentDate(date, acc.locale);

    const formatedMovement = formatMovement(mov, acc.locale, acc.currency);

    const html = ` 
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
      <div class="movements__date">${displayDate}</div>
      <div class="movements__value">${formatedMovement}</div>
  </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });

};


const calcDisplayBalance = (account) => {
  account.balance = account.movements.reduce((acc, cur) => acc + cur, 0);


  labelBalance.textContent = formatMovement(account.balance, account.locale, account.currency);
};



const calcDisplaySummary = (account) => {
  const incomes = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatMovement(incomes, account.locale, account.currency);

  const output = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatMovement(Math.abs(output), account.locale, account.currency);;

  const interest = account.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);

  labelSumInterest.textContent = formatMovement(interest, account.locale, account.currency);;

};



const createUsername = (accs) => {
  accs.forEach(acc => acc.username = acc.owner
    .toLowerCase()
    .split(' ')
    .map((word) => word[0])
    .join(''));
};


createUsername(accounts);

function updateUI(acc) {
  //display movements
  displayMovements(acc);

  //display balance
  calcDisplayBalance(acc);

  //display summary
  calcDisplaySummary(acc);
}


//Event handler
let currentAccount, timer;

btnLogin.addEventListener('click', (event) => {
  event.preventDefault();

  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);

  inputTransferAmount.value = inputTransferTo.value = '';

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //display UI and message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    // const now = new Date();
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hours = `${now.getHours()}`.padStart(2, 0);
    // const minutes = `${now.getMinutes()}`.padStart(2, 0);

    // labelDate.textContent = `${day}/${month}/${year}, ${hours}: ${minutes}`;
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      // weekday: 'long',
    };

    // const locale = navigator.language;
    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(now);

    //clear input fields

    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    updateUI(currentAccount);

  }


});

btnTransfer.addEventListener('click', (event) => {
  event.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);

  if (amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {

    currentAccount.movements.push(-amount);
    currentAccount.movementsDate.push(new Date());
    receiverAcc.movements.push(amount);
    receiverAcc.movementsDate.push(new Date());

    updateUI(currentAccount);

    //reset timer;
    clearInterval(timer);
    timer = startLogOutTimer();

  }

});

btnLoan.addEventListener('click', (e) => {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {


    setTimeout(() => {
      // add movement 
      currentAccount.movements.push(amount);
      currentAccount.movementsDate.push(new Date());

      clearInterval(timer);
      timer = startLogOutTimer();

      //update UI
      updateUI(currentAccount);
    }, 3000);


  }

  inputLoginUsername.value = inputLoginPin.value = '';

});


btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;

btnSort.addEventListener('click', (e) => {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

const startLogOutTimer = function () {

  let time = 200;

  const tick = () => {

    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    labelTimer.textContent = `${min}: ${sec}`;
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }
    time--;

  };
  tick();
  timer = setInterval(tick, 1000);
  return timer;
};




/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

;;
