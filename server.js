const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();
const passport = require('passport')
// importing our database configuration
const connectDB = require('./config/dbConfig')
const port  = process.env.PORT || 3000;


const app = express();
const Signup = require('./models/usermodel')
// importing homeRoutes
const homeRoutes = require('./controllers/homeRoutes')
const carRoutes = require('./controllers/carRoutes')
const truckRoutes = require('./controllers/truckRoutes')
const bodabodaRoutes = require('./controllers/bodabodaRoutes')
const taxiRoutes = require('./controllers/taxiRoutes')
const coasterRoutes = require('./controllers/coasterRoutes')
const userRoutes = require('./controllers/userRoutes')

const expressSession = require('express-session')({
    secret: 'secrete',
    resave: false,
    saveUnitialised: false

})

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
app.use('/api', bodabodaRoutes);
app.use('/api', taxiRoutes);
app.use('/api', coasterRoutes);
app.use('/api',userRoutes);
app.use(expressSession)
app.use(passport.initialize());
app.use(passport.session());

passport.use(Signup.createStrategy());
passport.serializeUser(Signup.serializeUser());
passport.deserializeUser(Signup.deserializeUser());


// running the server on a specific port (3000)
// This should always be the last line in the server file
app.listen(3000, () => console.log('listening on port 3000'));
