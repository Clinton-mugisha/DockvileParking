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

// car form route
router.get('/car', (req, res)=>{
    res.render('forms/carform.pug')
});

// car form rout
router.get('/taxi', (req, res)=>{
    res.render('forms/taxiform.pug')
});

// car form rout
router.get('/coaster', (req, res)=>{
    res.render('forms/coasterform.pug')
});

// car form rout
router.get('/boda', (req, res)=>{
    res.render('forms/bodabodaform.pug')
});

// car form rout
router.get('/truck', (req, res)=>{
    res.render('forms/truckform.pug')
});

// signup route
router.get('/sign', (req, res)=>{
    res.render('signup.pug')
});

module.exports = router
