const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3003;

app.use(express.json());

mongoose.connect( 'mongodb://127.0.0.1:27017/customer', {
    
});

const Customer = mongoose.model('Customer', {
    name: String,
    mobile: Number,
    flightId: String
  });
  
  app.get('/customer', async (req, res) => {
    try {
      const customer = await Customer.find();
      res.json(customer);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching products' });
    }
  });
  
  app.get('/customer/:id', async (req, res) => {
    try {
      const customer = await Customer.findById(req.params.id);
      if (customer) {
        res.json(customer);
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error fetching product' });
    }
  });
  
  app.post('/customer', async (req, res) => {
    try {
      const customer = new Customer(req.body);
      await customer.save();
      res.status(201).json(customer);
    } catch (error) {
      res.status(500).json({ error: 'Error creating product' });
    }
  });
  
  app.listen(PORT, () => {
    console.log(`Product service running on port ${PORT}`);
  });