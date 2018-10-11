const pg = require('pg');
// const connectionString = 'postgres://localhost:5432/sample_db';
let client = {
  host: 'ec2-18-144-17-138.us-west-1.compute.amazonaws.com',
  post: 5432,
  user: 'power_user',
  password: '$password',
  database: 'hackazon'
}
const connection = new pg.Client(client);

connection.connect((error, results) => {
  if (error) {
    console.log('ERROR failed to connect to DB', error)
  } else {
    console.log('Successfully connected to DB!')
  }
})

let searchQuery = (productID, callback) => {
  connection.query(`SELECT * FROM product_table INNER JOIN protection_table ON product_table.product_id = protection_table.product_id WHERE product_table.product_id = ${productID};`, (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results.rows[0]);
    }
  })
}

let insertQuery = (product, callback) => {
  connection.query(`INSERT INTO product_table (name, image, link, shares, price, is_prime, in_stock, giftwrap_available, quantity_max, seller) VALUES ('${product.name}', '${product.image}', '${product.link}', ${product.shares}, ${product.price}, ${product.is_prime}, ${product.in_stock}, ${product.giftwrap_available}, ${product.quantity_max}, '${product.seller}')`, (error, results) => {
    if (error) {
      console.log(`ERROR insert query`, error);
    } else {
      console.log(`Successfully inserted into DB!`);
    }
  });

  connection.query(`INSERT INTO protection_table (available, protection_name, protection_price, years, provider, rating, description) VALUES (${product.available}, '${product.protection_name}', ${product.protection_price}, ${product.years}, '${product.provider}', ${product.rating}, '${product.description}')`, (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}

let updateQuery = (product, callback) => {
  let key = Object.keys(product);
  connection.query(`UPDATE product_table SET ${key[0]} = '${product.key[0]}' WHERE product_id = 10000002`, (error, results) => {
    if (error) {
      console.log('ERROR failed to update')
      callback(error, null);
    } else {
      console.log('Successfully updated record!')
      callback(null, results);
    }
  })
}

let deleteQuery = (productID, callback) => {
  connection.query(`DELETE FROM protection_table WHERE product_id = ${productID}`, (error, results) => {
    if (error) {
      console.log(`ERROR delete query`, error);
    } else {
      console.log(`Successfully deleted from DB!`);
    }
  })

  connection.query(`DELETE FROM product_table WHERE product_id = ${productID}`, (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  })
}

module.exports = {
  searchQuery,
  insertQuery,
  updateQuery,
  deleteQuery,
}

//Stringify Post Object
// {name: 'Boba',
// image: 'boba.jpeg',
// link: 'boba.com',
// shares: 4,
// price: 7.77,
// is_prime: true,
// in_stock: true,
// giftwrap_available: true,
// quantity_max: 9,
// seller: 'Boba Joe',
// available: true,
// protection_name: 'Boba Guard',
// protection_price: 4.25,
// years: 3,
// provider: 'Boba Provider',
// rating: 4,
// description: 'This is boba'}
