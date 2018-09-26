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

app.get('/checkout/*', (req, res) => {
  // * representing the product ID
  const productId = req.originalUrl.split('/')[2];
  db.retrieveInformationById(productId, (err, data) => {
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
      console.log(error)
    } else {
      res.status(201).send('Post successful!');
    }
  })
})

// app.put('/update-item/:id', function(req, res) {
//     const update = _.assign({ "updatedAt": new Date() }, req.body);
//     Word.findByIdAndUpdate(req.params.id, update, function(err, raw) {
//         if (err) {
//             res.send(err);
//         }
//         res.send(raw);
//     });
// });

app.delete('/delete-item/*', (req, res) => {
  // * representing the product ID
  const productId = req.originalUrl.split('/')[2];
  db.removeItemById(productId, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send('Delete worked!');
    }
  });
});


const PORT = process.env.PORT || 7777;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
