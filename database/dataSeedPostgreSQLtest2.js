const fs = require('fs');
const faker = require('faker');
const cats = require('./helpers/cats.js');


const home = require("os").homedir();
var path = home + '/Documents/'


let startingLoop = 1;
let maxLoop = 10;
let currentNumber = 1;
console.time('Data generation completed in');

let seedFileProtection = (startingLoop, maxLoop, currentNumber) => {
  if (startingLoop > maxLoop) {
    console.timeEnd('Data generation completed in');
    return;
  } else {
    let protectionString = '';
    for (let i = 1; i <= 10; i++) {
      let record = `${currentNumber}|${currentNumber}|${faker.random.boolean()}|${faker.lorem.sentence()}|${(Math.random() * (1000) / 100).toFixed(2)}|${Math.floor(Math.random()*5) +1}|${faker.company.companyName()}|${Math.floor(Math.random()*5)}|${faker.lorem.sentence()}`;
      protectionString += record + '\n';
      currentNumber++;
    }

    fs.appendFile(path + 'protectionDataPostMini.csv', protectionString, (err) => {
      if (err) throw err;
      console.log('finished loop ' + startingLoop);
      startingLoop++;
      seedFileProtection(startingLoop, maxLoop, currentNumber);
    });
  }
}

seedFileProtection(startingLoop, maxLoop, currentNumber);


// let test = [];
// for (let i = 0; i < 1000000; i++) {
//   let testArray = [i, 'Clean-O-Bot' + i, cats.data[Math.floor(Math.random() * cats.data.length)], faker.lorem.sentence(), Math.floor(Math.random() * 100) + 1, faker.commerce.price(), faker.random.boolean(), faker.random.boolean(), faker.random.boolean(), Math.floor(Math.random() * 10) + 1, faker.company.companyName()];
//   test.push(testArray)
// }
//
// var ws = fs.createWriteStream(path + "data.csv");
// csv
//    .write(test, {headers: true})
//    .pipe(ws);

// Item Schema
// product_id INT,
// name VARCHAR(100),
// image VARCHAR(255),
// link VARCHAR(255),
// shares INT,
// price NUMERIC,
// is_prime BOOLEAN,
// in_stock BOOLEAN,
// giftwrap_available BOOLEAN,
// quantity_max INT,
// seller VARCHAR(100)



// item.product_id = currentNumber;
// item.name = 'Clean-O-Bot ' + currentNumber;
// item.image = cats.data[Math.floor(Math.random() * cats.data.length)];
// item.link = faker.lorem.sentence();
// item.shares = Math.floor(Math.random() * 100) + 1;
// item.price = faker.commerce.price();
// item.is_prime = faker.random.boolean();
// item.in_stock = faker.random.boolean();
// item.giftwrap_available = faker.random.boolean();
// item.quantity_max = Math.floor(Math.random() * 10) + 1;
// item.seller = faker.company.companyName();

//
// protectionPlan.id
// protectionPlan.product_id
// protectionPlan.exists
// protectionPlan.name
// protectionPlan.price
// protectionPlan.years
// protectionPlan.provider
// protectionPlan.rating
// protectionPlan.description
//
//
// ${currentNumber}|${currentNumber}|${faker.random.boolean()}|${faker.lorem.text()}|${(Math.random() * (1000) / 100).toFixed(2)}|${Math.floor(Math.random()*5) +1}|${faker.company.companyName()}|${Math.floor(Math.random()*5)}|${faker.lorem.lines()}
