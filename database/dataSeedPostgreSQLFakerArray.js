const fs = require('fs');
// const faker = require('faker');
const cats = require('./helpers/cats.js');
const random = require('./helpers/randomGenerator.js');

const home = require("os").homedir();
var path = home + '/Documents/'


let startingLoop = 1;
let maxLoop = 1;
let currentNumber = 1;
console.time('Data generation completed in');

let seedFileItem = (startingLoop, maxLoop, currentNumber) => {
  if (startingLoop > maxLoop) {
    console.timeEnd('Data generation completed in');
    return;
  } else {
    let string = [];
    for (let i = 1; i <= 25; i++) {
      let record = `"${random.boolean[Math.floor(Math.random() * 2)]}"`;
      // let record = `"${faker.company.companyName()}"`;
      string.push(record);
      currentNumber++;
    }

    fs.appendFile(path + 'fakerSentence.js', string, (err) => {
      if (err) throw err;
      console.log('finished loop ' + startingLoop);
      startingLoop++;
      seedFileItem(startingLoop, maxLoop, currentNumber);
    });
  }
}

seedFileItem(startingLoop, maxLoop, currentNumber);
