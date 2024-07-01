// Import required modules
const express = require('express');
const bodyParser = require('body-parser');

// Create an Express application
const app = express();
// Middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// In-memory store inventory
let inventory = [
  { id: 1, productName: 'Apples', quantity: 100, price: 1.5 },
  { id: 2, productName: 'Bananas', quantity: 75, price: 0.8 },
  { id: 3, productName: 'Milk', quantity: 50, price: 3.5 },
  { id: 4, productName: 'Bread', quantity: 80, price: 1.8 }
];

// Route handlers for CRUD operations

// Read all products
app.get('/', (req, res) => {
  res.render('index', { inventory });
});

// Read a specific product by ID
app.get('/inventory/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = inventory.find(inventory => inventory.id === productId);

  if (product) {
    res.render('productInfo', { product })
  } 
});

// Add a new product form
app.get('/addProductForm', (req, res) => {
  res.render('addProduct');
});

// Add a new product
app.post('/inventory', (req, res) => {
  const { productName, quantity, price } = req.body;
  const id = inventory[inventory.length-1].id + 1;
  //console.log(inventory[inventory.length-1].id);
  const newProduct = { id, productName, quantity, price };
  inventory.push(newProduct);
  res.redirect('/');
});

// Update a product by ID - First Find the product
app.get('/inventory/:id/update', (req, res) => {
  const productId = parseInt(req.params.id);
  
  // const updateProduct = inventory.find(product => inventory.id === productId);
  const updateProduct = inventory.find(function(inventory) {
      return inventory.id === parseInt(productId);
  });
  res.render('updateProduct', {updateProduct});
});

// Update a product by ID - Update the product information
app.post('/inventory/:id/update', (req, res) => {
  const productId = parseInt(req.params.id);
  const {productName, quantity, price} = req.body;
  const updatedProduct = {id: productId, productName: productName, quantity: quantity, price: price}

  inventory = inventory.map(inventory => {
    if (inventory.id === productId) {
      return { ...inventory, ...updatedProduct };
    }
    return inventory;
  });

  res.redirect('/');
});

//Delete a product by ID
app.get('/inventory/:id/delete', (req, res) => {
  const productId = parseInt(req.params.id);

  inventory = inventory.filter(inventory => inventory.id !== productId);
  res.redirect('/');
});

// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
