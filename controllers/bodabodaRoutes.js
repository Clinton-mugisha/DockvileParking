const express = require('express');
const Bodaboda = require('../models/bodabodamodel')
const router = express.Router();
const { calculateTotalAmount } = require('../controllers/utils');
const session = require('express-session');

// Use the session middleware
router.use(session({
  secret: '123', // Replace with your own secret key
  resave: false,
  saveUninitialized: true
}));

// Bodaboda form route
router.get('/bodaboda', (req, res)=>{
  try{
    let generatedId = Math.floor(Math.random()*10000)
    res.render('bodabodaform.pug', { randId: generatedId})

  }catch(error){
    return res.status(400).send({ message: 'sorry could not get form' });
      console.log(error);
  }
  
});

router.get('/bodabodalist', async (req, res) => {
        try{
            let items= await Bodaboda.find(); // .find is a moongose function that finds all the stuff from the model
            const bodabodacount = await Bodaboda.countDocuments();
            req.session.bodabodacount = bodabodacount;
            let amount = await Bodaboda.aggregate([
                {'$group': {_id: '$all',
            totalamount: {$sum: '$amount'}
        }}
//let ages =group{totalAge{sum}}
            ])  
            res.render('bodabodalist',{bodabodas:items, custotal:amount[0].totalamount,bodabodacount })
            
            
        }
        catch(error){
            return res.status(400).send({message:'sorry could not get employees'});
            console.log(error);
        }
    })



router.post('/regbodaboda', async(req, res) => {
    try{
      let generatedId = Math.floor(Math.random()*10000)
        const bodaboda = new Bodaboda(req.body);
        await bodaboda.save();
        console.log(req.body);
        res.redirect('/api/home') // redirect to home page
       
    }catch(error){
        res.status(400).render('bodabodaform')
        console.log(error)
        //we redirect a path we render a file

    }

});

    router.get('/bodabodalist', async (req, res) => {
        try{
            let items= await Bodaboda.find(); // .find is a moongose function that finds all the stuff from the model
            const bodabodacount = await Bodaboda.countDocuments();
            req.session.bodabodacount = bodabodacount;
            let amount = await Bodaboda.aggregate([
                {'$group': {_id: '$all',
            totalamount: {$sum: '$amount'}
        }}
//let ages =group{totalAge{sum}}
            ])  
            res.render('bodabodalist',{bodabodas:items, custotal:amount[0].totalamount,bodabodacount })
            
            
        }
        catch(error){
            return res.status(400).send({message:'sorry could not get employees'});
            console.log(error);
        }
    })


    router.post('/bodaboda/delete', async (req, res) => {
        try{
            await Bodaboda.deleteOne({_id: req.body.id});
            res.redirect('back');
    
        }catch(error){
            res.status(400).send('Unable to delete item from the database')
    
        }
    })  

// how to update data
// it involves a get and a post
router.get('/bodaboda/edit/:id', async (req, res) => {
    try{
        const bo = await Bodaboda.findOne({_id: req.params.id}); //params means its passing by the parameter
        res.render('editbodaboda', {bodaboda: bo})

    }catch(error){
        res.status(400).send('Could not find customer in database')
        console.log(error)

    }
})
//this is our post route for the newly editted data (updating)
router.post('/bodaboda/edit', async (req, res) => {
    try{
        await Bodaboda.findOneAndUpdate({_id: req.query.id},req.body);
        res.redirect('/api/bodabodalist')

    }catch(error){
        res.status(400).send('Could not edit bodaboda data') 
        console.log(error)

    }
})


router.get('/bodabodalistt', async (req, res) => {
    try {
      let items = await Bodaboda.find();
  
      // Calculate the sum of valves, puncturefixing, and tirepressure for each document
      let amounts = await Bodaboda.aggregate([
        {
          $project: {
            totalAmount: { $sum: ['$valves', '$puncturefixing', '$tirepressure'] },
          },
        },
        {
          $group: {
            _id: null,
            bodaboda: { $sum: '$totalAmount' },
            bodabodas: { $push: '$$ROOT' },
          },
        },
      ]);
  
      // Extract the grandTotal from the aggregated result
      let bodaboda = amounts.length > 0 ? amounts[0].bodaboda : 0;
      req.session.bodaboda = bodaboda;
      res.render('bodabodalistt', { bodabodas: items, bodaboda });
    } catch (error) {
      return res.status(400).send({ message: 'sorry could not get employees' });
      console.log(error);
    }
  });
  router.get('/bodabodablist', async (req, res) => {
    try {
      let items = await Bodaboda.find();
  
      // Calculate the sum of valves, puncturefixing, and tirepressure for each document
      let amounts = await Bodaboda.aggregate([
        {
          $group: {
            _id: null,
            bodaboda: { $sum: '$batterysizeamount' },
            bodabodas: { $push: '$$ROOT' },
          },
        },
      ]);
  
      // Extract the grandTotal from the aggregated result
      let bodaboda = amounts.length > 0 ? amounts[0].bodaboda : 0;
      req.session.bodabodab = bodaboda;
      res.render('bodabodablist', { bodabodas: items, bodaboda });
    } catch (error) {
      return res.status(400).send({ message: 'sorry could not get employees' });
      console.log(error);
    }
  });

// router.get('/bodabodalistt', async (req, res) => {
//     try{
//         let items= await Bodaboda.find(); // .find is a moongose function that finds all the stuff from the model
//         let grandTotal = 0;
// for (const bodaboda of items) {
//   const total = (bodaboda.valves || 0) + (bodaboda.tirepressure || 0) + (bodaboda.puncturefixing || 0);
//   grandTotal += total;
// }
//         res.render('bodabodalistt',{bodabodas:items, grandTotal})
        
        
//     }
//     catch(error){
//         return res.status(400).send({message:'sorry could not get customers'});
//         console.log(error);
//     }
// })


router.post('/searchb', async (req, res) => {
  try {
    const searchTerm = req.body.search.toLowerCase();
    const item = await Bodaboda.find({
      $or: [
        { firstname: { $regex: searchTerm, $options: 'i' } },
        { lastname: { $regex: searchTerm, $options: 'i' } },
        { model: { $regex: searchTerm, $options: 'i' } },
        { date: { $regex: searchTerm, $options: 'i' } },
        { time: { $regex: searchTerm, $options: 'i' } }
      ]
    });

    res.render('bodabodalist.pug', { bodabodas: item });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Could not perform search" });
  }
});

module.exports = router;

