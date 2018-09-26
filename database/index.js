const mongoose = require('mongoose');
mongoose.connect(process.env.MLAB_DB_URI, { useNewUrlParser: true });


const productSchema = new mongoose.Schema({
  product_id: Number,
  name: String,
  image: String,
  shares: Number,
  link: String,
  price: Number,
  is_prime: Boolean,
  in_stock: Boolean,
  giftwrap_available: Boolean,
  quantity_max: Number,
  seller: String,
  protection_plan: {
    exists: Boolean,
    name: String,
    price: Number,
    years: Number,
    provider: String,
    rating: Number,
    description: String,
  },
  used_option: {
    exists: Boolean,
    price: Number,
  },
});

const Product = mongoose.model('Product', productSchema);

const retrieveInformationById = (id, callback) => {
  Product.find({ product_id: id }, (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};

const addItem = (item, callback) => {
  const newEntry = new Product(item);
  newEntry.save((error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  })
};


// Product.findById(id, function (err, tank) {
//   if (error) {
//     console.log(error);
//   } else {
//     tank.size = 'large';
//     tank.save(function (err, updatedTank) {
//       if (err) return handleError(err);
//       res.send(updatedTank);
//     });
//   }
// });



const removeItemById = (id, callback) => {
  Product.find({ product_id: id }, (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  }).remove();
};

module.exports = {
  retrieveInformationById,
  addItem,
  removeItemById,
};

// removeItemById({
//   product_id: 105,
//   name: 'Pizza',
//   image: 'Party',
//   shares: 100,
//   link: 'Hot dog',
//   price: 99,
//   is_prime: true,
//   in_stock: true,
//   giftwrap_available: true,
//   quantity_max: 10,
//   seller: 'Bobby',
//   protection_plan: {
//     exists: true,
//     name: 'Chai',
//     price: 999,
//     years: 2,
//     provider: 'Joe',
//     rating: 12,
//     description: 'It a good one',
//   },
//   used_option: {
//     exists: true,
//     price: 99,
//   },
// })


// Post sample
// {"product_id":106,"name":"Fries","image":"Party","shares":100,"link":"Hot dog","price":99,"is_prime":true,"in_stock":true,"giftwrap_available":true,"quantity_max":10,"seller":"Bobby","protection_plan":{"exists":true,"name":"Chai","price":999,"years":2,"provider":"Joe","rating":12,"description":"It a good one"},"used_option":{"exists":true,"price":99}}
