const express = require('express');
const Coaster = require('../models/coastermodel')
const router = express.Router();
const { calculateTotalAmount } = require('../controllers/utils');



router.post('/regcoaster', async(req, res) => {
    try{
        const taxi = new Coaster(req.body);
        await taxi.save();
        console.log(req.body);
        res.redirect('/api/home') // redirect to home page
       
    }catch(error){
        res.status(400).render('coasterform')
        console.log(error)
        //we redirect a path we render a file

    }

});

    router.get('/coasterlist', async (req, res) => {
        try{
            let items= await Coaster.find(); // .find is a moongose function that finds all the stuff from the model
            let amount = await Coaster.aggregate([
                {'$group': {_id: '$all',
            totalamount: {$sum: '$amount'}
        }}
//let ages =group{totalAge{sum}}
            ])  
            res.render('coasterlist',{coasters:items, custotal:amount[0].totalamount })
            
            
        }
        catch(error){
            return res.status(400).send({message:'sorry could not get items'});
            console.log(error);
        }
    })


    router.post('/coaster/delete', async (req, res) => {
        try{
            await Coaster.deleteOne({_id: req.body.id});
            res.redirect('back');
    
        }catch(error){
            res.status(400).send('Unable to delete item from the database')
    
        }
    })  

// how to update data
// it involves a get and a post
router.get('/coaster/edit/:id', async (req, res) => {
    try{
        const co = await Coaster.findOne({_id: req.params.id}); //params means its passing by the parameter
        res.render('editcoaster', {coaster: co})

    }catch(error){
        res.status(400).send('Could not find customer in database')
        console.log(error)

    }
})
//this is our post route for the newly editted data (updating)
router.post('/coaster/edit', async (req, res) => {
    try{
        await Coaster.findOneAndUpdate({_id: req.query.id},req.body);
        res.redirect('/api/coasterlist')

    }catch(error){
        res.status(400).send('Could not edit coaster data') 
        console.log(error)

    }
})


module.exports = router;

