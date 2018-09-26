require('dotenv').config();
const express = require('express');
const cors = require('cors')

const app = express();

const bodyParser = require('body-parser');
const path = require('path');
const db = require('../database');

app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log(`${req.method} request recieved at ${req.url}.`);
  next();
});

app.use(cors( { origin: 'http://localhost:3000'} ));
app.use(express.static('./client/dist'));

app.get('/checkout/:id', (req, res) => {
  db.retrieveInformationById(req.params.id, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.json(data[0]);
    }
  });
});

app.post('/add-item/', (req, res) => {
  db.addItem(req.body, (error, results) => {
    if (error) {
      res.send(err);
    } else {
      res.status(201).send('Post successful!');
    }
  })
})

app.put('/update-item/:id', function(req, res) {
  db.updateItem(req.params.id, req.body, (error, results) => {
    if (error) {
      res.send(error);
    } else {
      res.status(201).send('Update successful!')
    }
  })
});

app.delete('/delete-item/:id', (req, res) => {
  db.removeItemById(req.params.id, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send('Delete worked!');
    }
  });
});


const PORT = process.env.PORT || 7777;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
