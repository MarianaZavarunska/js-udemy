let country = 'Ukraine';
let continent = 'Europe';
let population = 44120000;
console.log(country, continent, population);

const isIsland = false;
let language;
console.log(typeof isIsland);
console.log(typeof population);
console.log(typeof country);
console.log(typeof language);

language = 'ukrainian';

// basic operators

console.log(population / 2);
console.log(population + 1);
console.log(population > 6000000);
console.log(population < 33000000);

let description = country + ' is in ' + continent + ', and its ' + population + ' million people speak ' + language;

console.log(description);

// template strings

description = `${country} is in ${continent}, and its ${population} million people speak ${language}`;
console.log(description);

// if/else

if (population > 33000000) {
    console.log(`${country}'s population is above average!`);
} else {
    const resultPopulation = population - 33000000;

    console.log(`${country}'s population is ${resultPopulation} million bellow average!`);
}

// equality 

// let numNeighbours = Number(prompt('How many neighbour countries does your country have?'));

// if (numNeighbours === 1) {
//     console.log('Only 1 border!');
// } else if (numNeighbours >= 1) {
//     console.log('More than 1 border');
// } else {
//     console.log('No borders');
// }

if (language === 'english' && population < 50000000 && !isIsland) {
    console.log(`You should live in ${country}`);
} else {
    console.log(`${country} does not meet your criteria`);
}

//switch

switch (language) {
    case 'chinese':
    case 'mandarin':
        console.log('MOST number of native speakers!');
        break;
    case 'spanish':
        console.log('2nd place in number of native speakers');
        break;
    case 'english':
        console.log('3rd place');
        break;
    case 'hindi':
        console.log('Number 4');
        break;
    case 'arabic':
        console.log('5th most spoken language');
        break;
    default:
        console.log('Great language too :D');
        break;
}

//ternary operator

console.log(`${country} population is ${population > 33000000 ? 'above' : 'below'} average.`)


//============= PART 2 ===============

// functions

function describeCountry(country, population, capitalCity) {
    return `${country} has ${population} million people and its capital city is ${capitalCity}.`;
}

const ourCountry = describeCountry('Ukraine', 44120000, 'Kyiv');

console.log(ourCountry);

//declarations and expressions
const worldPopulation = 7900000000;

function percentageOfWorld1(population) {
    return `${population / worldPopulation * 100}`;
}
const percentageOfWorld = percentageOfWorld1('China', 1441000000);
console.log(percentageOfWorld);

///
const percentageOfWorld2 = function (country, population) {
    return `${country} has ${population / worldPopulation * 100} % of the population`;
}
console.log(percentageOfWorld2('China', 1441000000));

///
const percentageOfWorld3 = (country, population) => `${country} has ${population / worldPopulation * 100} % of the population`;

console.log(percentageOfWorld3('China', 1441000000));

// Functions Calling Other Functions

function describePopulation(country, population) {
    const percentage = percentageOfWorld1(country, population);


    return `${country} has ${population} million people,
    which is about ${percentage}% of the world.`
}

console.log(describePopulation('Ukraine', 44120000));

// array

let populations = [population, 144100000, 345000000, 8000000];

console.log(populations.length);

let percentages = [percentageOfWorld1(population), percentageOfWorld1(144100000), percentageOfWorld1(345000000)];
console.log(percentages);

//array operations

let neighbours = ['Poland', 'Slovakia', 'Hungary', 'Romania', 'Moldova', 'Belarus'];
neighbours.push('Utopia');
neighbours.pop();

!neighbours.includes('Germany') ? console.log('Probably not a central European country :D') : console.log('central European country');

neighbours[neighbours.indexOf('Poland')] = 'Sweden';
console.log(neighbours);

//object

// let myCountry = {
//     country: 'Ukraine',
//     capital: 'Kyiv',
//     language: 'ukrainian',
//     population: 44120000,
//     neighbours: ['Poland', 'Slovakia', 'Hungary', 'Romania', 'Moldova', 'Belarus']
// }

// dot vs bracket

// console.log(`${myCountry.country} has ${myCountry.population} million ${myCountry.language} - speaking people, ${myCountry.neighbours.length} neighbouring countries
// and a capital called ${myCountry.capital}.`);

// myCountry.population += 2;
// console.log(myCountry);

// myCountry['population'] += 2;
// console.log(myCountry);

//object methods

let myCountry = {
    country: 'Ukraine',
    capital: 'Kyiv',
    language: 'ukrainian',
    population: 44120000,
    neighbours: ['Poland', 'Slovakia', 'Hungary', 'Romania', 'Moldova', 'Belarus'],

    describe: function () {
        return `${this.country} has ${this.population} million ${this.language} - speaking people, ${this.neighbours.length} neighbouring countries and a capital called ${this.capital}.`
    },

    checkIsIsland: function () {
        this.isIsland = this.neighbours.length ? false : true;

        // return this.isIsland;
    }

}

console.log(myCountry.describe());
// myCountry.checkIsIsland();
console.log(myCountry.isIsland);

//loop

for (let i = 1; i < 51; i++) {
    console.log(`Voter number ${i} is currently voting'`);
}

// loop / break and continue

let percentages2 = [];

for (let i = 0; i < populations.length; i++) {
    percentages2.push(percentageOfWorld1(populations[i]));

}
console.log(percentages);
console.log(percentages2);

// loops in loops
let listOfNeighbours = [['Canada', 'Mexico'], ['Spain'], ['Norway', 'Sweden', 'Russia']];

for (let i = 0; i < listOfNeighbours.length; i++) {
    if (Array.isArray(listOfNeighbours[i]) && listOfNeighbours[i].length > 1) {
        for (let j = 0; j < listOfNeighbours[i].length; j++) {
            console.log(`Neighbour: ${listOfNeighbours[i][j]}`);
        }
    }

}
