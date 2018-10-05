const express = require('express');
const cors = require('cors');

const app = express();

const bodyParser = require('body-parser');
// const path = require('path');
const controller = require('../database/indexPostgreSQL.js');

app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log(`${req.method} request recieved at ${req.url}.`);
  next();
});

app.use(cors( { origin: 'http://localhost:3000'} ));
app.use(express.static('../client/dist/'));

app.get('/checkout/:id', (req, res) => {
  controller.searchQuery(req.params.id, (error, results) => {
    if (error) {
      console.error('ERROR searchQuery controller failed')
    } else {
      console.log('Successful searchQuery!');
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
      res.send(result);
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
