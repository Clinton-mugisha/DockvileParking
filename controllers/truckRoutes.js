const express = require('express');
const Truck = require('../models/truckmodel')
const router = express.Router();
const { calculateTotalAmount } = require('../controllers/utils');
const session = require('express-session');

// Use the session middleware
router.use(session({
  secret: '123', // Replace with your own secret key
  resave: false,
  saveUninitialized: true
}));

router.get('/truck', (req, res)=>{
  try{
    let generatedId = Math.floor(Math.random()*10000)
    res.render('truckform.pug', { randId: generatedId})

  }catch(error){
    return res.status(400).send({ message: 'sorry could not get form' });
      console.log(error);
  }
  
});

router.post('/regtruck', async(req, res) => {
    try{
        const truck = new Truck(req.body);
        await truck.save();
        console.log(req.body);
        res.redirect('/api/home') // redirect to home page
       
    }catch(error){
        res.status(400).render('truckform')
        console.log(error)
        //we redirect a path we render a file

    }

});

    router.get('/trucklist', async (req, res) => {
        try{
            let items= await Truck.find(); // .find is a moongose function that finds all the stuff from the model
            const truckcount = await Truck.countDocuments();
            req.session.truckcount = truckcount;
            let amount = await Truck.aggregate([
                {'$group': {_id: '$all',
            totalamount: {$sum: '$amount'}
        }}
//let ages =group{totalAge{sum}}
            ])  
            res.render('trucklist',{trucks:items, custotal:amount[0].totalamount, truckcount })
            
            
        }
        catch(error){
            return res.status(400).send({message:'sorry could not get customers'});
            console.log(error);
        }
    })

    router.post('/truck/delete', async (req, res) => {
        try{
            await Truck.deleteOne({_id: req.body.id});
            res.redirect('back');
    
        }catch(error){
            res.status(400).send('Unable to delete item from the database')
    
        }
    })  

// how to update data
// it involves a get and a post
router.get('/truck/edit/:id', async (req, res) => {
    try{
        const tr = await Truck.findOne({_id: req.params.id}); //params means its passing by the parameter
        res.render('edittruck', {truck: tr})

    }catch(error){
        res.status(400).send('Could not find customer in database')
        console.log(error)

    }
})
//this is our post route for the newly editted data (updating)
router.post('/truck/edit', async (req, res) => {
    try{
        await Truck.findOneAndUpdate({_id: req.query.id},req.body);
        res.redirect('/api/trucklist')

    }catch(error){
        res.status(400).send('Could not edit trucks data') 
        console.log(error)

    }
})


router.get('/trucklistt', async (req, res) => {
    try {
      let items = await Truck.find();
  
      // Calculate the sum of valves, puncturefixing, and tirepressure for each document
      let amounts = await Truck.aggregate([
        {
          $project: {
            totalAmount: { $sum: ['$valves', '$puncturefixing', '$tirepressure'] },
          },
        },
        {
          $group: {
            _id: null,
            truck: { $sum: '$totalAmount' },
            trucks: { $push: '$$ROOT' },
          },
        },
      ]);
  
      // Extract the grandTotal from the aggregated result
      let truck = amounts.length > 0 ? amounts[0].truck : 0;
      req.session.truck = truck;
      res.render('trucklistt', { trucks: items, truck });
    } catch (error) {
      return res.status(400).send({ message: 'sorry could not get employees' });
      console.log(error);
    }
  });


// router.get('/trucklistt', async (req, res) => {
//     try{
//         let items= await Truck.find(); // .find is a moongose function that finds all the stuff from the model
//         let trucks = 0;
// for (const truck of items) {
//   const total = (truck.valves || 0) + (truck.tirepressure || 0) + (truck.puncturefixing || 0);
//   trucks += total;
// }
// req.session.trucks = trucks;
//         res.render('trucklistt',{trucks:items, trucks})
        
        
//     }
//     catch(error){
//         return res.status(400).send({message:'sorry could not get customers'});
//         console.log(error);
//     }
// })

router.post('/searchtr', async (req, res) => {
  try {
    const searchTerm = req.body.search.toLowerCase();
    const item = await Truck.find({
      $or: [
        { firstname: { $regex: searchTerm, $options: 'i' } },
        { lastname: { $regex: searchTerm, $options: 'i' } },
        { model: { $regex: searchTerm, $options: 'i' } },
        { date: { $regex: searchTerm, $options: 'i' } },
        { time: { $regex: searchTerm, $options: 'i' } }
      ]
    });

    res.render('trucklist.pug', { trucks: item });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Could not perform search" });
  }
});

router.get('/truckblist', async (req, res) => {
  try {
    let items = await Truck.find();

    // Calculate the sum of valves, puncturefixing, and tirepressure for each document
    let amounts = await Truck.aggregate([
      {
        $group: {
          _id: null,
          truck: { $sum: '$batterysizeamount' },
          trucks: { $push: '$$ROOT' },
        },
      },
    ]);

    // Extract the grandTotal from the aggregated result
    let truck = amounts.length > 0 ? amounts[0].truck : 0;
    req.session.truckb = truck;
    res.render('truckblist', { trucks: items, truck });
  } catch (error) {
    return res.status(400).send({ message: 'sorry could not get employees' });
    console.log(error);
  }
});

module.exports = router;

