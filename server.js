const express = require('express');
const app = express();
const fruits = require('./models/fruits');
const vegetables = require('./models/vegetables');
const viewEngine = require('jsx-view-engine');

app.set('view engine', 'jsx');
app.set('views', './views');
app.engine('jsx', viewEngine());

// Index Route
app.get('/', (req, res) => {
  res.render('Home')
});

app.get('/fruits', (req, res) => {
  res.render('fruits/Index', { fruits: fruits });
});

app.get('/vegetables', (req,res) => {
  res.render('vegetables/Index', {vegetables: vegetables});
});

app.get('/fruits/:indexofFruitsArray', (req,res) => {
  const { indexofFruitsArray } = req.params;
  res.render('fruits/Show', {fruit: fruits[indexofFruitsArray] });
});

app.get('/vegetables/:indexofVegetablesArray', (req,res) => {
  const { indexofVegetablesArray } = req.params;
  res.render('vegetables/Show', {vegetable: vegetables[indexofVegetablesArray] });
});

app.listen(3000, console.log('listening on port 3000'))
