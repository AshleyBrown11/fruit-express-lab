const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const fruits = require('./models/fruits');
const vegetables = require('./models/vegetables');

const jsxViewEngine = require('jsx-view-engine');

app.set('view engine', 'jsx');
app.set('views', './views');
app.engine('jsx', jsxViewEngine());

app.get('/', (req, res) => {
  res.render('Home')
});

// Middleware;
app.use((req, res, next) => {
  console.log('Middleware: I run for all routes, 1');
  next();
});
// By implementing the line below, we now have access to the req.body. Which is the parsed formData from the form request.
app.use(express.urlencoded({ extended: false }));

// const middleware = (req, res, next) => {
//   console.log('Middleware: I run for all routes, 1');
//   next();
// };

// Index
app.get('/fruits', (req, res) => {
  console.log('Index controller');
  res.render('fruits/Index', { fruits });
});

app.get('/vegetables', (req, res) => {
  console.log('Index controller');
  res.render('vegetables/Index', { vegetables });
});

// New
app.get('/fruits/new', (req, res) => {
  console.log('New controller');
  res.render('fruits/New');
});

app.get('/vegetables/new', (req, res) => {
  console.log('New controller');
  res.render('vegetables/New');
});

// Delete

// Update

// Create
app.post('/fruits', (req, res) => {
  // if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
  //   req.body.readyToEat = true; //do some data correction
  // } else { //if not checked, req.body.readyToEat is undefined
  //   req.body.readyToEat = false; //do some data correction
  // }
  req.body.readyToEat = req.body.readyToEat === 'on';

  fruits.push(req.body);
  console.log(fruits);

  res.redirect('/fruits');
});

app.post('/vegetables', (req, res) => {
  // if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
  //   req.body.readyToEat = true; //do some data correction
  // } else { //if not checked, req.body.readyToEat is undefined
  //   req.body.readyToEat = false; //do some data correction
  // }
  req.body.readyToEat = req.body.readyToEat === 'on';

  vegetables.push(req.body);
  console.log(vegetables);

  res.redirect('/vegetables');
});

// Edit

// Show
app.get('/fruits/:id', (req, res) => {
  //second param of the render method must be an object
  res.render('fruits/Show', {
    //there will be a variable available inside the jsx file called fruit, its value is fruits[req.params.indexOfFruitsArray]
    fruit: fruits[req.params.id],
  });
});

app.get('/vegetables/:id', (req, res) => {
  //second param of the render method must be an object
  res.render('vegetables/Show', {
    //there will be a variable available inside the jsx file called fruit, its value is fruits[req.params.indexOfFruitsArray]
    vegetable: vegetables[req.params.id],
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});







// const express = require('express');
// const app = express();
// const fruits = require('./models/fruits');
// const vegetables = require('./models/vegetables');
// const jsxViewEngine = require('jsx-view-engine');

// app.set('view engine', 'jsx');
// app.set('views', './views');
// app.engine('jsx', jsxViewEngine());

// // Index Route
// app.get('/', (req, res) => {
//   res.render('Home')
// });

// app.get('/fruits', (req, res) => {
//   res.render('fruits/Index', { fruits });
// });

// app.get('/vegetables', (req,res) => {
//   res.render('vegetables/Index', {vegetables});
// });

// app.get('/fruits/:indexofFruitsArray', (req,res) => {
//   const { indexofFruitsArray } = req.params;
//   res.render('fruits/Show', {fruit: fruits[indexofFruitsArray] });
// });

// app.get('/vegetables/:indexofVegetablesArray', (req,res) => {
//   const { indexofVegetablesArray } = req.params;
//   res.render('vegetables/Show', {vegetable: vegetables[indexofVegetablesArray] });
// });

// // New
// app.get('/vegetables/new', (req, res) => {
//   console.log('New controller');
//   res.render('vegetables/New');
// });

// // Create
// app.post('/vegetables', (req, res) => {
//   // if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
//   //   req.body.readyToEat = true; //do some data correction
//   // } else { //if not checked, req.body.readyToEat is undefined
//   //   req.body.readyToEat = false; //do some data correction
//   // }
//   req.body.readyToEat = req.body.readyToEat === 'on';

//   vegetables.push(req.body);
//   console.log(vegetables);

//   res.send('data received');
// });
// // Show
// app.get('/vegetables/:id', (req, res) => {
//   //second param of the render method must be an object
//   res.render('vegetables/Show', {
//     //there will be a variable available inside the jsx file called fruit, its value is fruits[req.params.indexOfFruitsArray]
//     vegetable: vegetables[req.params.id],
//   });
// });  

// app.listen(3000, console.log('listening on port 3000'))
