const fs = require('fs');
const cats = require('./helpers/cats.js');
const random = require('./helpers/randomGenerator.js');


const home = require("os").homedir();
var path = home + '/Documents/'


let startingLoop = 1;
let maxLoop = 40;
let currentNumber = 1;
console.time('Data generation completed in');

let seedFileItem = (startingLoop, maxLoop, currentNumber) => {
  if (startingLoop > maxLoop) {
    console.timeEnd('Data generation completed in');
    return;
  } else {
    let string = "";
    for (let i = 1; i <= 250000; i++) {
      let record = `${currentNumber}|${'Clean-O-Bot ' + currentNumber}|${cats.data[Math.floor(Math.random() * cats.data.length)]}|${random.sentence[Math.floor(Math.random() * 25)]}|${Math.floor(Math.random() * 100) + 1}|${random.price[Math.floor(Math.random() * 25)]}|${random.boolean[Math.floor(Math.random() * 2)]}|${random.boolean[Math.floor(Math.random() * 2)]}|${random.boolean[Math.floor(Math.random() * 2)]}|${Math.floor(Math.random() * 10) + 1}|${random.company[Math.floor(Math.random() * 25)]}|${currentNumber}|${random.boolean[Math.floor(Math.random() * 2)]}|${random.sentence[Math.floor(Math.random() * 25)]}|${(Math.random() * (1000) / 100).toFixed(2)}|${Math.floor(Math.random()*5) +1}|${random.company[Math.floor(Math.random() * 25)]}|${Math.floor(Math.random()*5)}|${random.sentence[Math.floor(Math.random() * 25)]}`;
      string += record + '\n';
      currentNumber++;
    }

    fs.appendFile(path + 'cassandraData.csv', string, (err) => {
      if (err) throw err;
      console.log('finished loop ' + startingLoop);
      startingLoop++;
      seedFileItem(startingLoop, maxLoop, currentNumber);
    });
  }
}

seedFileItem(startingLoop, maxLoop, currentNumber);
