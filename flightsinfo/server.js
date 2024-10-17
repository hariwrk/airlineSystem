const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3002;

app.use(express.json());

mongoose.connect( 'mongodb://127.0.0.1:27017/flight', {
    
});

const Flight = mongoose.model('Flignt', {
    name: String,
    capasity: Number,
    airlinId: String
  });
  
  app.get('/flight', async (req, res) => {
    try {
      const flight = await Flight.find();
      res.json(flight);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching products' });
    }
  });
  
  app.get('/flight/:id', async (req, res) => {
    try {
      const flight = await Flight.findById(req.params.id);
      if (flight) {
        res.json(flight);
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error fetching product'+error });
    }
  });

  // flight by airlines id
  app.get('/flight/airline/:id', async (req, res) => {
    try {
      const flight = await Flight.find({ airlinId: req.params.id });
      if (flight) {
        res.json(flight);
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error fetching product'+error });
    }
  });
  
  app.post('/flight', async (req, res) => {
    try {
      const flight = new Flight(req.body);
      await flight.save();
      res.status(201).json(flight);
    } catch (error) {
      res.status(500).json({ error: 'Error creating product' });
    }
  });
  
  app.listen(PORT, () => {
    console.log(`Product service running on port ${PORT}`);
  });