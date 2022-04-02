// ======== 1
console.log('===Task 1===');

let massOfMark = 95;
let massOfJohn = 85;
let heightOfMark = 1.88;
let heightOfJohn = 1.76;

let bmiOfMark = massOfMark / heightOfMark ** 2;
let bmiOfJohn = massOfJohn / heightOfJohn ** 2;

let markHigherBMI = bmiOfMark > bmiOfJohn;

console.log(markHigherBMI);

// ======== 2 
console.log('===Task 2===');

if (bmiOfMark > bmiOfJohn) {
    console.log(`Mark's BMI (${bmiOfMark}) is higher than John's (${bmiOfJohn})`);
} else {
    console.log(`John's  BMI (${bmiOfJohn}) is higher than Mark's (${bmiOfMark})`);
}


// ====== 3
console.log('===Task 3===');

let scoreDolphins1 = 97;
let scoreDolphins2 = 112;
let scoreDolphins3 = 101;
let scoreKoalas1 = 109;
let scoreKoalas2 = 95;
let scoreKoalas3 = 123;


// let averageDolphins = (scoreDolphins1 + scoreDolphins2 + scoreDolphins3) / 3;

// let averageKoalas = (scoreKoalas1 + scoreKoalas2 + scoreKoalas3) / 3;

// if (scoreDolphins1 >= 100 || scoreDolphins2 >= 100 || scoreDolphins3 >= 100) {

//     if (scoreKoalas1 >= 100 || scoreKoalas2 >= 100 || scoreKoalas3 >= 100) {

//         if (averageDolphins > averageKoalas) {
//             console.log('Dolphins won!');
//         } else {
//             console.log('Koalas won!');
//         }

//     } else {
//         console.log('Nobody won!');
//     }
// }

// ========= 4

let bill = 275;

let tip = bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;

console.log(`The bill was ${bill}, the tip was ${tip}, and the total value ${bill + tip}`);


// Part 2

//========= 1

scoreDolphins1 = 85;
scoreDolphins2 = 54;
scoreDolphins3 = 41;
scoreKoalas1 = 23;
scoreKoalas2 = 34;
scoreKoalas3 = 27;

const calculateAverage = (score1, score2, score3) => (score1 + score2 + score3) / 3;

const averageDolphins = calculateAverage(scoreDolphins1, scoreDolphins2, scoreDolphins3);

const averageKoalas = calculateAverage(scoreKoalas1, scoreKoalas2, scoreKoalas3);

console.log(averageDolphins, averageKoalas);


function checkWinner(avgDolhins, avgKoalas) {

    if (avgDolhins >= avgKoalas * 2) {
        console.log(`Dolhins win ( ${avgDolhins} vs. ${avgKoalas})`);
    } else if (avgKoalas >= avgDolhins * 2) {
        console.log(`Koalas win ( ${avgKoalas} vs. ${avgDolhins})`);
    } else {
        console.log('Nobody won!');
    }
}
checkWinner(averageDolphins, averageKoalas);

//========= 2

function calcTip(bill) {
    if (bill >= 50 && bill <= 300) {
        return bill * 0.15;
    } else {
        return bill * 0.2;
    }
}

let bills = [125, 555, 44];
let tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];

console.log(tips);

let totals = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]];

console.log(totals);

//========= 3

let mark = {
    fullName: 'Mark Miller',
    mass: 78,
    height: 1.69,

    calcBMI: function () {
        this.BMI = this.mass / this.height ** 2;

        return this.BMI;
    }

};

let john = {
    fullName: 'John Smith',
    mass: 92,
    height: 1.95,

    calcBMI: function () {
        this.BMI = this.mass / this.height ** 2;

        return this.BMI;
    }

};

if (mark.calcBMI() > john.calcBMI()) {
    console.log(`${mark.fullName}'s BMI ${mark.calcBMI()} is higher than ${john.fullName}'s ${john.calcBMI()}.`);
} else if (mark.calcBMI() < john.calcBMI()) {
    console.log(`${john.fullName}'s BMI ${john.calcBMI()} is higher than ${mark.fullName}'s ${mark.calcBMI()}.`);
}

//========= 4

bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];

tips = [];
totals = [];

for (let i = 0; i < bills.length; i++) {
    tips.push(calcTip(bills[i]));
    totals.push(bills[i] + calcTip(bills[i]));
}
console.log(tips);
console.log(totals);


//Developer Skills & Editor Setup

const temp1 = [17, 21, 23];
const temp2 = [12, 5, -5, 0, 4];

const printForecast = (arr) => {
    let temperature = '';
    arr.forEach((item, i) => temperature += `...${item}C in ${i + 1} days`);
    //     let temperature = '';
    //     for (let i = 0; i < arr.length - 1, i++;) {
    //         temperature += `... ${arr[i]}oC in ${i + 1} days`;
    //     }
    console.log(temperature);
};

printForecast(temp1);
printForecast(temp2);

//Data Structures, Modern Operators and Strings

const game = {
    team1: 'Bayern Munich', team2: 'Borrussia Dortmund', players: [
        [
            'Neuer',
            'Pavard',
            'Martinez',
            'Alaba',
            'Davies',
            'Kimmich',
            'Goretzka',
            'Coman',
            'Muller',
            'Gnarby',
            'Lewandowski',
        ], [
            'Burki',
            'Schulz',
            'Hummels',
            'Akanji',
            'Hakimi',
            'Weigl',
            'Witsel',
            'Hazard',
            'Brandt',
            'Sancho',
            'Gotze',
        ],],
    score: '4:0',
    scored: ['Lewandowski', 'Gnarby', 'Lewandowski',
        'Hummels'],
    date: 'Nov 9th, 2037',
    odds: {
        team1: 1.33,
        x: 3.25,
        team2: 6.5,
    },
};

//1
const [players1, players2] = game.players;
//2
const [gk, ...fieldPlayers] = players1;
//3
const allplayers = [...players1, ...players2];
//4 
const playersFinal = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
//5
const { odds: { team1, x: draw, team2 } } = game;
//6
const printGoals = (...players) => {
    console.log(`${players.length} goals were scored`);

};

printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
printGoals(...game.scored);

//7

team1 < team2 && console.log('Team 1 is more likely to win');
team1 > team2 && console.log('Team 2 is more likely to win');




