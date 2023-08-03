const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();
// importing our database configuration
const connectDB = require('./config/dbConfig')
const port  = process.env.PORT || 3000;

const app = express();

// importing homeRoutes
const homeRoutes = require('./controllers/homeRoutes')
const carRoutes = require('./controllers/carRoutes')
const truckRoutes = require('./controllers/truckRoutes')


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// calling the function
connectDB();

// setting up pug as our view engine
app.engine('pug', require('pug').__express);
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
// app.set('views', path.join(__dirname, 'views/forms'));

// setting up directory for static files
app.use(express.static(path.join(__dirname, 'public')));

// using imported routes
app.use('/api', homeRoutes)
app.use('/api', carRoutes);
app.use('/api', truckRoutes);



// running the server on a specific port (3000)
// This should always be the last line in the server file
app.listen(3000, () => console.log('listening on port 3000'));
