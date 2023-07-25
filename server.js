const express = require('express');
const path = require('path');
const app = express();

// importing homeRoutes
const homeRoutes = require('./controllers/homeRoutes')



// setting up pug as our view engine
app.engine('pug', require('pug').__express);
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// setting up directory for static files
app.use(express.static(path.join(__dirname, 'public')));

// using imported routes
app.use('/api', homeRoutes)



// running the server on a specific port (3000)
// This should always be the last line in the server file
app.listen(3000, () => console.log('listening on port 3000'));
