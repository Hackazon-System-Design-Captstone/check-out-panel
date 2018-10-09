let nr = require('newrelic');

const express = require('express');
const cors = require('cors');
const redis = require("redis");

const app = express();

const bodyParser = require('body-parser');
const path = require('path');
const controller = require('../database/indexPostgreSQL.js');

const DIST_DIR = path.join(__dirname, '../client/dist/');

let client = redis.createClient();

client.on('connect', function(error) {
  if (error) {
    console.log('ERROR connecting to redis')
  } else {
    console.log('Connected to redis...')
  }
});

app.use(bodyParser.json());
// app.use((req, res, next) => {
//   console.log(`${req.method} request recieved at ${req.url}.`);
//   next();
// });

// app.use(cors( { origin: 'http://localhost:3000'} ));
app.use(express.static(DIST_DIR));


app.get('/checkout/:id', (req, res) => {

  client.get(req.params.id, (error, results) => {

    if (results !== null) {
      res.send(JSON.parse(results))
    } else {
      controller.searchQuery(req.params.id, (error, results) => {
        if (error) {
          console.error('ERROR searchQuery controller failed')
        } else {

          let result = {
            giftwrap_available: results.giftwrap_available,
            image: results.image,
            in_stock: results.in_stock,
            is_prime: results.is_prime,
            link: results.link,
            name: results.name,
            price: results.price,
            product_id: results.product_id,
            quantity_max: results.quantity_max,
            seller: results.seller,
            shares: results.shares,
            protection_plan: {
              description: results.description,
              exists: results.available,
              name: results.protection_name,
              price: results.protection_price,
              provider: results.provider,
              rating: results.rating,
              years: results.years,
            }
          }
          client.setex(req.params.id, 10, JSON.stringify(result));
          res.send(result);
        }
      })
    }
  })

})

app.post('/add-product', (req, res) => {
  controller.insertQuery(req.body, (error, results) => {
    if (error) {
      res.send(error);
    } else {
      res.status(201).send('Post successful!')
    }
  })
})

app.put('/update-product', (req, res) => {
  controller.updateQuery(req.body, (error, results) => {
    if (error) {
      res.send(error);
    } else {
      res.status(200).send('Update successful!')
    }
  })
})

app.delete('/delete-product/:id', (req, res) => {
  controller.deleteQuery(req.params.id, (error, results) => {
    if (error) {
      res.send(error);
    } else {
      res.status(202).send('Delete successful!')
    }
  })
})

app.listen(3003, () => console.log('Listening on port 3003...'));
