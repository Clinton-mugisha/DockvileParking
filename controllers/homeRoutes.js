const express = require('express');
const router = express.Router();
const { calculateTotalAmount } = require('../controllers/utils');
const parkingListTRoute = require('../controllers/carRoutes');
const session = require('express-session');

// Use the session middleware
router.use(session({
  secret: '123', // Replace with your own secret key
  resave: false,
  saveUninitialized: true
}));


router.get('/home', async (req, res, next) => {
    try {
      // Calculate the total amounts for each collection
      const totalCarAmount = await calculateTotalAmount('car');
      const totalTruckAmount = await calculateTotalAmount('truck');
      const totalBodabodaAmount = await calculateTotalAmount('bodaboda');
      const totalTaxiAmount = await calculateTotalAmount('taxi');
      const totalCoasterAmount = await calculateTotalAmount('coaster');
      const grandTotal = req.session.grandTotal;
      const coaster= req.session.coaster;



  
      // Calculate the overall total
      const overallTotal = totalCarAmount + totalTruckAmount + totalBodabodaAmount + totalTaxiAmount + totalCoasterAmount;
  
      res.render('home', {
        totalCarAmount,
        totalTruckAmount,
        totalBodabodaAmount,
        totalTaxiAmount,
        grandTotal,
        coaster,
        totalCoasterAmount,
        overallTotal, // Pass the overall total to the template

      });
    } catch (error) {
      next(error);
    }
  });

  router.use(parkingListTRoute);


// // hello route
// router.get('/home', (req, res)=>{
//     res.render('home.pug')
// });

// Tables route
router.get('/tables', (req, res)=>{
    res.render('tables.pug')
});
// Tables route
router.get('/tablest', (req, res)=>{
    res.render('tablest.pug')
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
router.get('/truck', (req, res)=>{
    res.render('truckform.pug')
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
router.get('/bodaboda', (req, res)=>{
    res.render('bodabodaform.pug')
});

// car form rout


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
router.get('/tireclinic', (req, res)=>{
    res.render('tireclinic.pug')
});

module.exports = router
