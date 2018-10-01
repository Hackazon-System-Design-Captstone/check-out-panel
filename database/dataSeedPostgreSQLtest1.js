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
    return;
  } else {
    let string = "";
    for (let i = 1; i <= 500000; i++) {
      let record = `${currentNumber}|${'Clean-O-Bot ' + currentNumber}|${cats.data[Math.floor(Math.random() * cats.data.length)]}|${faker.lorem.sentence()}|${Math.floor(Math.random() * 100) + 1}|${faker.commerce.price()}|${faker.random.boolean()}|${faker.random.boolean()}|${faker.random.boolean()}|${Math.floor(Math.random() * 10) + 1}|${faker.company.companyName()}`;
      string += record + '\n';
      currentNumber++;
    }

    fs.appendFile(path + 'itemDataPost.csv', string, (err) => {
      if (err) throw err;
      console.log('finished loop ' + startingLoop);
      startingLoop++;
      seedFileItem(startingLoop, maxLoop, currentNumber);
    });
  }
}

seedFileItem(startingLoop, maxLoop, currentNumber);
