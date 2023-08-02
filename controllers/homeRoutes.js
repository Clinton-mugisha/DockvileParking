const express = require('express');
const router = express.Router();



// hello route
router.get('/home', (req, res)=>{
    res.render('home.pug')
});

// landing page route
router.get('/landing', (req, res)=>{
    res.render('landingpage.pug')
});

// parking route
router.get('/parking', (req, res)=>{
    res.render('parking.pug')
});


// car form rout
router.get('/taxi', (req, res)=>{
    res.render('taxiform.pug')
});

// car form route
router.get('/car', (req, res)=>{
    res.render('carform.pug')
});

// car form rout
router.get('/coaster', (req, res)=>{
    res.render('coasterform.pug')
});

// car form rout
router.get('/boda', (req, res)=>{
    res.render('bodabodaform.pug')
});

// car form rout
router.get('/truck', (req, res)=>{
    res.render('truckform.pug')
});

// signup route
router.get('/sign', (req, res)=>{
    res.render('signup.pug')
});
// email route
router.get('/email', (req, res)=>{
    res.render('email.pug')
});
// event route
router.get('/events', (req, res)=>{
    res.render('events.pug')
});
// rentingb route
router.get('/rentingb', (req, res)=>{
    res.render('rentingb.pug')
});
// revenue route
router.get('/revenue', (req, res)=>{
    res.render('revenue.pug')
});
// settings route
router.get('/settings', (req, res)=>{
    res.render('settings.pug')
});

// team rote
router.get('/team', (req, res)=>{
    res.render('team.pug')
});
// tireclinic route
router.get('/tire', (req, res)=>{
    res.render('tire.pug')
});

module.exports = router
