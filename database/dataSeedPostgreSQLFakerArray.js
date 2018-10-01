const fs = require('fs');
const faker = require('faker');
const cats = require('./helpers/cats.js');


const home = require("os").homedir();
var path = home + '/Documents/'


let startingLoop = 1;
let maxLoop = 20;
let currentNumber = 1;
console.time('Data generation completed in');

let seedFileItem = (startingLoop, maxLoop, currentNumber) => {
  if (startingLoop > maxLoop) {
    console.timeEnd('Data generation completed in');
    startingLoop = 1;
    maxLoop = 2;
    currentNumber = 1;
    console.time('Data generation completed in');
    return;
  } else {
    let string = "";
    for (let i = 1; i <= 50; i++) {
      let record = `${faker.lorem.sentence()},`;
      string += record + '\n';
      currentNumber++;
    }

    fs.appendFile(path + 'fakerSentence.csv', string, (err) => {
      if (err) throw err;
      console.log('finished loop ' + startingLoop);
      startingLoop++;
      seedFileItem(startingLoop, maxLoop, currentNumber);
    });
  }
}

seedFileItem(startingLoop, maxLoop, currentNumber);
