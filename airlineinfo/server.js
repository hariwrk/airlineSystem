const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');

const app = express();
const PORT = 3001;

app.use(express.json());

mongoose.connect( 'mongodb://127.0.0.1:27017/airline', {
    
});

const Airline = mongoose.model('Airline', {
    name: String,
    rating: Number
  });
  
  app.get('/airline', async (req, res) => {
    try {
      const airline = await Airline.find();
      res.json(airline);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching products' });
    }
  });

  app.get('/airline/flight/:id', async (req, res) => {
    try {
      const flight = await axios.get(`http://localhost:3002/flight/airline/${req.params.id}`);
      res.json(flight);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching products' });
    }
  });
  
  app.get('/airline/:id', async (req, res) => {
    try {
      const airline = await Airline.findById(req.params.id);
      if (airline) {
        res.json(airline);
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error fetching product' });
    }
  });
  
  app.post('/airline', async (req, res) => {
    try {
      const airline = new Airline(req.body);
      await airline.save();
      res.status(201).json(airline);
    } catch (error) {
      res.status(500).json({ error: 'Error creating product' });
    }
  });
  
  app.listen(PORT, () => {
    console.log(`Product service running on port ${PORT}`);
  });