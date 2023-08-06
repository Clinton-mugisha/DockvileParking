const express = require('express');
const Taxi = require('../models/taximodel')
const router = express.Router();
const { calculateTotalAmount } = require('../controllers/utils');



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
            let amount = await Taxi.aggregate([
                {'$group': {_id: '$all',
            totalamount: {$sum: '$amount'}
        }}
//let ages =group{totalAge{sum}}
            ])  
            res.render('taxilist',{taxis:items, custotal:amount[0].totalamount })
            
            
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


module.exports = router;

