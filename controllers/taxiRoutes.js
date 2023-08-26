const express = require('express');
const Taxi = require('../models/taximodel')
const router = express.Router();
const { calculateTotalAmount } = require('../controllers/utils');
const session = require('express-session');

// Use the session middleware
router.use(session({
  secret: '123', // Replace with your own secret key
  resave: false,
  saveUninitialized: true
}));

router.get('/taxi', (req, res)=>{
  try{
    let generatedId = Math.floor(Math.random()*10000)
    res.render('taxiform.pug', { randId: generatedId})

  }catch(error){
    return res.status(400).send({ message: 'sorry could not get form' });
      console.log(error);
  }
  
});

router.post('/regtaxi', async(req, res) => {
    try{
        const taxi = new Taxi(req.body);
        await taxi.save();
        console.log(req.body);
        res.redirect('/api/home') // redirect to home page
       
    }catch(error){
        res.status(400).render('taxiform')
        console.log(error)
        //we redirect a path we render a file

    }

});

    router.get('/taxilist', async (req, res) => {
        try{
            let items= await Taxi.find(); // .find is a moongose function that finds all the stuff from the model
            const taxicount = await Taxi.countDocuments();
            req.session.taxicount = taxicount;
            let amount = await Taxi.aggregate([
                {'$group': {_id: '$all',
            totalamount: {$sum: '$amount'}
        }}
//let ages =group{totalAge{sum}}
            ])  
            res.render('taxilist',{taxis:items, custotal:amount[0].totalamount,taxicount })
            
            
        }
        catch(error){
            return res.status(400).send({message:'sorry could not get items'});
            console.log(error);
        }
    })


    router.post('/taxi/delete', async (req, res) => {
        try{
            await Taxi.deleteOne({_id: req.body.id});
            res.redirect('back');
    
        }catch(error){
            res.status(400).send('Unable to delete item from the database')
    
        }
    })  

// how to update data
// it involves a get and a post
router.get('/taxi/edit/:id', async (req, res) => {
    try{
        const tx = await Taxi.findOne({_id: req.params.id}); //params means its passing by the parameter
        res.render('edittaxi', {taxi: tx})

    }catch(error){
        res.status(400).send('Could not find customer in database')
        console.log(error)

    }
})
//this is our post route for the newly editted data (updating)
router.post('/taxi/edit', async (req, res) => {
    try{
        await Taxi.findOneAndUpdate({_id: req.query.id},req.body);
        res.redirect('/api/taxilist')

    }catch(error){
        res.status(400).send('Could not edit taxi data') 
        console.log(error)

    }
})

router.get('/taxilistt', async (req, res) => {
    try {
      let items = await Taxi.find();
  
      // Calculate the sum of valves, puncturefixing, and tirepressure for each document
      let amounts = await Taxi.aggregate([
        {
          $project: {
            totalAmount: { $sum: ['$valves', '$puncturefixing', '$tirepressure'] },
          },
        },
        {
          $group: {
            _id: null,
            taxi: { $sum: '$totalAmount' },
            taxis: { $push: '$$ROOT' },
          },
        },
      ]);
  
      // Extract the grandTotal from the aggregated result
      let taxi = amounts.length > 0 ? amounts[0].taxi : 0;
      req.session.taxi = taxi;
      res.render('taxilistt', { taxis: items, taxi });
    } catch (error) {
      return res.status(400).send({ message: 'sorry could not get employees' });
      console.log(error);
    }
  });

// router.get('/taxilistt', async (req, res) => {
//     try{
//         let items= await Taxi.find(); // .find is a moongose function that finds all the stuff from the model
//         let grandTotal = 0;
// for (const taxi of items) {
//   const total = (taxi.valves || 0) + (taxi.tirepressure || 0) + (taxi.puncturefixing || 0);
//   grandTotal += total;
// }
//         res.render('taxilistt',{taxis:items, grandTotal})
        
        
//     }
//     catch(error){
//         return res.status(400).send({message:'sorry could not get customers'});
//         console.log(error);
//     }
// })

router.post('/searchta', async (req, res) => {
  try {
    const searchTerm = req.body.search.toLowerCase();
    const item = await Taxi.find({
      $or: [
        { firstname: { $regex: searchTerm, $options: 'i' } },
        { lastname: { $regex: searchTerm, $options: 'i' } },
        { model: { $regex: searchTerm, $options: 'i' } },
        { date: { $regex: searchTerm, $options: 'i' } },
        { time: { $regex: searchTerm, $options: 'i' } }
      ]
    });

    res.render('taxilist.pug', { taxis: item });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Could not perform search" });
  }
});

module.exports = router;

