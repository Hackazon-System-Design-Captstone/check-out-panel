const faker = require('faker');
const cats = require('./cats.js');

module.exports.generateRandomData = (id) => {
  const obj = {
    protection_plan: {},
  };
  obj.product_id = id;
  obj.name = faker.commerce.productName();

  if (cats.data[id]) {
    obj.image = cats.data[id];
  } else {
    obj.image = cats.data[Math.floor(id / 3)];
  }

  obj.link = faker.lorem.sentence();
  obj.shares = Math.floor(Math.random() * 100) + 1;
  obj.price = faker.commerce.price();
  obj.is_prime = faker.random.boolean();
  obj.in_stock = faker.random.boolean();
  obj.giftwrap_available = faker.random.boolean();
  obj.quantity_max = Math.floor(Math.random() * 10) + 1;
  obj.seller = faker.company.companyName();

  obj.protection_plan.exists = faker.random.boolean();
  obj.protection_plan.name = faker.lorem.text();
  obj.protection_plan.price = (Math.random() * (1000) / 100).toFixed(2);
  obj.protection_plan.years = Math.floor(Math.random()*5) +1;
  obj.protection_plan.provider = faker.company.companyName();
  obj.protection_plan.rating = Math.floor(Math.random()*5);
  obj.protection_plan.description = faker.lorem.lines();

  return obj;
};

// TEST
console.log(cats.data[0]);
