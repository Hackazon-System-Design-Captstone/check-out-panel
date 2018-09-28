const fs = require('fs');
const csv = require('fast-csv');
const faker = require('faker');
const cats = require('./helpers/cats.js');


const home = require("os").homedir();
var path = home + '/Documents/'



let test = [];
for (let i = 0; i < 1000000; i++) {
  let testArray = [i, 'Clean-O-Bot' + i, cats.data[Math.floor(Math.random() * cats.data.length)], faker.lorem.sentence(), Math.floor(Math.random() * 100) + 1, faker.commerce.price(), faker.random.boolean(), faker.random.boolean(), faker.random.boolean(), Math.floor(Math.random() * 10) + 1, faker.company.companyName()];
  test.push(testArray)
}

var ws = fs.createWriteStream(path + "data.csv");
csv
   .write(test, {headers: true})
   .pipe(ws);

  // var ws = fs.createWriteStream("data.csv");
  // csv
  //    .write([
  //        ['andrew', 'ngo'],
  //        ['alan', 'fu']
  //    ], {headers: true})
  //    .pipe(ws);



     // let ws = fs.createWriteStream('data.csv');
     //
     // csv
     //   .write([testArray], {headers:true})
     //   .pipe(ws);

// //Write to JSON file
//
// let testArray = [];
// for (let i = 0; i < 1000; i++) {
//   let testObject = {};
//   testObject[i] = "Boba " + i
//   testArray.push(testObject);
// }
//
// let path = fs.createWriteStream('data.json')
//
// path.write(JSON.stringify(testArray), (error) => {
//   if (error) {
//     console.log('ERROR write file failed', error)
//   } else {
//     console.log('Write file successful!')
//   }
// })
// drain event

console.log(test)
